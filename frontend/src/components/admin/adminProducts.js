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
  const userId=useSelector((state)=>state.Auth.userId)

  //get data 

  const fetchData = async () => {

    dispatch(setLoading(true))
     try {
      dispatch(setLoading(true));
       const  data =await GetProducts(userId);
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
 const deletehandler=async(id ,userId)=>{
    try {
         await DeleteProduct(id,userId);
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
  const data = products?.map((item ,index)=>(
    <Cards data={item} key={index} DeleteProduct={()=>deletehandler(item.id)} UpdateProduct={()=>editHandler(item)}></Cards>
  ))
  return (
    <>
      {loading ? "loading....":<div className="h-50">AdminProducts</div>} 
    

<div>
      <h2 className="text-2xl font-bold mb-4">Explore Unique Themes</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data}
      </ul>
    </div>
    </>
  )
}

export default AdminProducts;
