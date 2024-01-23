import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setError,
  setLoading,
  getProducts,
  setSelectedProduct
} from "../../redux/slices/adminproductManager";
import { GetProducts, UpdateProduct } from "../../api/productApi";
import ProductForm from "./productForm";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate()
  const selectedProduct = useSelector((state) => state.AdminProductsManager.selectedProduct);

  const productNameRef = useRef(null);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);
  const stockRef = useRef(null);
  const categoryRef = useRef(null);

  useEffect(() => {
    productNameRef.current.value = selectedProduct?.name || "";
    priceRef.current.value = selectedProduct?.price || "";
    descriptionRef.current.value = selectedProduct?.description || "";
    stockRef.current.value = selectedProduct?.stock || "";
    categoryRef.current.value = selectedProduct?.category || "";
  }, [selectedProduct]);

  const [files, setFiles] = useState([]);

  const userId =useSelector((state)=>state.Auth.userId);
  const loading = useSelector((state) => state.AdminProductsManager.loading);
  const error = useSelector((state) => state.AdminProductsManager.error);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("name", productNameRef.current.value);
      formData.append("price", priceRef.current.value);
      formData.append("description", descriptionRef.current.value);
      formData.append("stock", stockRef.current.value);
      formData.append("category", categoryRef.current.value);

      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      let res;
      if (selectedProduct) {
        res = await UpdateProduct(selectedProduct.id, formData ,userId);
      } else {
        res = await axios.post("/api/product/addproduct", formData);
      }

      if (res.status === 200) {
        dispatch(setError(null));
        dispatch(setSelectedProduct(null));
        const data = await GetProducts(userId);
        console.group("hellow")
        dispatch(getProducts(data));
        navigate('/')
      }

      
    } catch (error) {
      if (error.response) {
        dispatch(setError(error.response.data.message));
      } else if (error.request) {
        dispatch(setError("Network error. Please try again."));
      } else {
        dispatch(setError("An unexpected error occurred. Please try again."));
      }
    } finally {
      dispatch(setLoading(false));
    }

    productNameRef.current.value = "";
    priceRef.current.value = "";
    descriptionRef.current.value = "";
    stockRef.current.value = "";
    categoryRef.current.value = "";
    setFiles([]);
  };

  return (
    <>
      <ProductForm
        handleSubmit={handleSubmit}
        productNameRef={productNameRef}
        priceRef={priceRef}
        descriptionRef={descriptionRef}
        stockRef={stockRef}
        categoryRef={categoryRef}
        handleFileChange={handleFileChange}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default AddProduct;
