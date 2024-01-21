import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../commonAccounts/cards";
import {
  getProducts,
  setLoading,
  setError
} from "../../redux/slices/adminproductManager";
import  {GetProducts ,DeleteProduct} from  '../../api/productApi'

function AdminProducts() {
  const dispatch = useDispatch();
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
      if (error.response) {
        dispatch(setError(error.response.data.message));
      } else if (error.request) {
        dispatch(setError("Network error. Please try again."));
      } else {
        dispatch(setError("An unexpected error occurred. Please try again."));
      }
    
    }finally{
      dispatch(setLoading(false))
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  
//delete data 
 const deletehandler=async(id)=>{
    try {
         await DeleteProduct(id);
            fetchData();
    } catch (error) {
      if (error.response) {
        dispatch(setError(error.response.data.message));
      } else if (error.request) {
        dispatch(setError("Network error. Please try again."));
      } else {
        dispatch(setError("An unexpected error occurred. Please try again."));
      }
    
    }finally{
      dispatch(setLoading(false))
    }
    }
 
//
const editHandler=()=>{
  
}
     console.log(products);
  const data = products.map((item ,index)=>(
    <Cards data={item} key={index} DeleteProduct={()=>deletehandler(item.id)} UpdateProduct={()=>editHandler}></Cards>
  ))
  return (
    <>
    {loading ? "loading....":<div className="h-50">AdminProducts</div>}
    {data}
    </>
  )
}

export default AdminProducts;
