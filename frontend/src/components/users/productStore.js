import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import {setLoading ,setError ,getProducts }  from '../../redux/slices/adminproductManager'
import {GetAllProducts}  from '../../api/productApi'
import  {addTocart ,getCartProducts}  from  '../../api/cartApis';
import Cards from '../commonAccounts/cards';
import {getcartsProducts} from '../../redux/slices/cartSlice'


function ProductStore() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.AdminProductsManager.products);
    const loading = useSelector((state) => state.AdminProductsManager.loading);
    const error = useSelector((state) => state.AdminProductsManager.error);
    const cartId = useSelector((state) => state.Auth.cartId);
    
    
    const fetchData = async () => {
        dispatch(setLoading(true))
         try {
          dispatch(setLoading(true));
           const  data =await GetAllProducts();
          dispatch(getProducts(data));
        } catch (error) {
          handleFetchError(error);
        }finally{
          dispatch(setLoading(false))
        }
      };
    
      // useEffect(() => {
      //   fetchData();
      // }, [dispatch]);

      const handleFetchError = (error) => {
        if (error.response) {
          setError(error.response.data.message);
        } else if (error.request) {
          setError('Network error. Please try again.');
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      };

       // add to cart
        const AddToCart= async(id ,cartId)=>{
               try {
                const data =await addTocart(id ,cartId);
                const totolData=await getCartProducts(cartId);
                dispatch(getcartsProducts(totolData))
               } catch (error) {
                handleFetchError(error);
                } 
              }
        
        
        const BuyProduct=()=>{
              console.log("in thes buty")
        }
      const data = products?.map((item ,index)=>(
        <Cards data={item} key={index} AddToCart={()=>AddToCart(item.id ,cartId)} BuyProduct={()=>BuyProduct(item.id)}></Cards>
      ))
  return (
    <div>{loading?"loading" : data}</div>
  )
}

export default ProductStore