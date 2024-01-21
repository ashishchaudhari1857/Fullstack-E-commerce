import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setLoading,
  getProducts,
} from "../../redux/slices/adminproductManager";
import { GetProducts } from "../../api/productApi";

const AddProduct = () => {
  const dispatch = useDispatch();

  const productNameRef = useRef(null);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);
  const stockRef = useRef(null);
  const categoryRef=useRef(null);
  const [files, setFiles] = useState([]);

  const userId = localStorage.getItem("userId");

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

      const res = await axios.post("/api/product/addproduct", formData);
      if (res.status === 200) {
        dispatch(setError(null));
      }

      const data = await GetProducts();
      dispatch(getProducts(data));
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
    setFiles([]);
  };
  return (
    <div className="max-w-md p-8 mx-auto mt-8 bg-white rounded shadow-lg">
      <h2 className="mb-5 font-mono text-2xl font-semibold text-center">
        {" "}
        Product Form
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-600"
          >
            Product Name
          </label>
          <input
            required
            type="text"
            id="productName"
            ref={productNameRef}
            className="w-full p-1 mt-1 border rounded-md"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-600"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            ref={priceRef}
            className="w-full p-1 mt-1 border rounded-md"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            id="description"
            ref={descriptionRef}
            className="w-full p-1 mt-1 border rounded-md"
            rows="3"
          ></textarea>
        </div>
        <div className="mb-3">
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-600"
          >
            Stock
          </label>
          <input
            type="number"
            required
            id="stock"
            ref={stockRef}
            className="w-full p-1 mt-1 border rounded-md"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-600"
          >
            Category
          </label>
          <input
            type="text"
            required
            id="category"
            ref={categoryRef}
            className="w-full p-1 mt-1 border rounded-md"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="photos"
            className="block text-sm font-medium text-gray-600"
          >
            Pictures
          </label>
          <input
            type="file"
            required
            id="file"
            multiple
            onChange={handleFileChange}
            className="w-full p-1 mt-1 text-sm border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="p-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          {loading ? "Submitting......." : "Submit"}
        </button>
        {error && (
          <div className="flex items-center justify-center mt-5 font-mono font-bold text-red-600 capitalize">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
