import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../commonAccounts/cards";
import {
  getProducts,
  setLoading,
  setError,
  setSelectedProduct
} from "../../redux/slices/adminproductManager";
import  {GetProducts ,DeleteProduct } from  '../../api/productApi'
import { useNavigate } from 'react-router-dom';


function AdminProducts() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const products = useSelector((state) => state.AdminProductsManager.products);
  const loading = useSelector((state) => state.AdminProductsManager.loading);
  const error = useSelector((state) => state.AdminProductsManager.error);

  //get data 

  const fetchData = async () => {
    dispatch(setLoading(true))
     try {
      dispatch(setLoading(true));
       const  data =await GetProducts();
      dispatch(getProducts(data));
    } catch (error) {
      handleFetchError(error);
    }finally{
      dispatch(setLoading(false))
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  //error
  const handleFetchError = (error) => {
    if (error.response) {
      setError(error.response.data.message);
    } else if (error.request) {
      setError('Network error. Please try again.');
    } else {
      setError('An unexpected error occurred. Please try again.');
    }
  };
//delete data 
 const deletehandler=async(id)=>{
    try {
         await DeleteProduct(id);
            fetchData();
    } catch (error) {
      handleFetchError(error);
    
    }finally{
      dispatch(setLoading(false))
    }
    }
 
//
const editHandler=(item)=>{
  dispatch(setSelectedProduct(item));
  navigate('/addproduct')
}
  const data = products.map((item ,index)=>(
    <Cards data={item} key={index} DeleteProduct={()=>deletehandler(item.id)} UpdateProduct={()=>editHandler(item)}></Cards>
  ))
  return (
    <>
    {loading ? "loading....":<div className="h-50">AdminProducts</div>}
    {data}
    </>
  )
}

export default AdminProducts;
