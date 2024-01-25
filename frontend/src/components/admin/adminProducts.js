import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../commonAccounts/cards";
import toast, { Toaster } from "react-hot-toast";
import {
  getProducts,
  setLoading,
  setError,
  setSelectedProduct,
} from "../../redux/slices/adminproductManager";
import { GetProducts, DeleteProduct } from "../../api/productApi";
import { NavLink, useNavigate } from "react-router-dom";

function AdminProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.AdminProductsManager.products);
  const loading = useSelector((state) => state.AdminProductsManager.loading);
  const userId = useSelector((state) => state.Auth.userId);
  const error =useSelector((state)=> state.AdminProductsManager.error)

  //get data
  const fetchData = async () => {
  
    dispatch(setLoading(true));
    try {
       const data = await GetProducts(userId); 
      dispatch(getProducts(data));
    } catch (error) {
      handleFetchError(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  //error
  const handleFetchError = (error) => {
    if (error.response) {
      toast.error(error.response.data.message)
      dispatch(setError(error.response.data.message))
    } else if (error.request) {
      toast.error("Network error. Please try again.")
       dispatch( setError("Network error. Please try again."))
    } else {
      toast.error("An unexpected error occurred. Please try again.")
      dispatch(setError("An unexpected error occurred. Please try again."))
    }
  };
  
  //delete data
  const deletehandler = async (id, userId) => {
    const toastId= toast.loading("proccessing..")
    try {
    
      await DeleteProduct(id, userId);
      toast.success("delete successfully..")
      fetchData();
      
    } catch (error) {
      toast.dismiss(toastId);
      handleFetchError(error);
     
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
      
    }
  };

  //edit data
  const editHandler = (item) => {
    dispatch(setSelectedProduct(item));
    navigate("/addproduct");
  };

  const data = products?.map((item, index) => (
    <Cards
      data={item}
      key={index}
      DeleteProduct={() => deletehandler(item.id, userId)}
      UpdateProduct={() => editHandler(item)}
    ></Cards>
  ));
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen text-center">
          <div className="w-5 h-5 border-b-2 border-black rounded-full animate-spin"></div>
          <span className="ml-2 font-mono text-md">loading......</span>
        </div>
      ) : data?.length === 0 ? (
        <div className="flex items-center text-xl h-screen text-center justify-center mt-5 font-mono font-bold text-red-600 capitalize">
          <h1>{error ? "Something Went wrong! Please  Try  again" :<div> <h1>No Product for Sell</h1> <NavLink to='/addproduct' className="text-center flex justify-center text-orange-600" > start selling</NavLink></div>} </h1>{" "}
        </div>
      ) : (
        <div>
          <h2 className="m-5 mb-4 text-2xl font-bold text-center text-gray-700">
            My Products
          </h2>
          <ul className="grid grid-cols-1 gap-2 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
            {data}
          </ul>
        </div>
      )}

<Toaster />
    </>
  );
}

export default AdminProducts;
