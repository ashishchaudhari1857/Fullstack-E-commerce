import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import {setLoading ,setError ,getProducts }  from '../../redux/slices/adminproductManager'
import {GetAllProducts}  from '../../api/productApi'
import  {addTocart ,getCartProducts}  from  '../../api/cartApis';
import Cards from '../commonAccounts/cards';
import {getcartsProducts} from '../../redux/slices/cartSlice'
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from 'react-router-dom';


function ProductStore() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.AdminProductsManager.products);
    const loading = useSelector((state) => state.AdminProductsManager.loading);
    const error = useSelector((state) => state.AdminProductsManager.error);
    const cartId = useSelector((state) => state.Auth.cartId);
    
    
    const fetchData = async () => {
        dispatch(setLoading(true))
         try {
         
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
          toast.error(error.response.data.message)
           dispatch( setError(error.response.data.message))
        } else if (error.request) {
          toast.error("Network error. Please try again.")
         dispatch( setError("Network error. Please try again."))
          
        } else {
          toast.error("An unexpected error occurred. Please try again.")
          dispatch(setError("An unexpected error occurred. Please try again."))
        }
      };

       // add to cart
        const AddToCart= async(id ,cartId)=>{
          const toastId=toast.loading("processing.....")
               try {
                
                const data =await addTocart(id ,cartId);
                const totolData=await getCartProducts(cartId);
                dispatch(getcartsProducts(totolData))
                toast.success("item added Succesfully")
               } catch (error) {
                handleFetchError(error);
                } finally {
                  toast.dismiss(toastId); // Dismiss the loading toast
                }
              }
        
        
        const BuyProduct=()=>{
              console.log("in thes buty")
        }
      const data = products?.map((item ,index)=>(
        <Cards data={item} key={index} AddToCart={()=>AddToCart(item.id ,cartId)} BuyProduct={()=>BuyProduct(item.id)}></Cards>
      ))
  return (
    
   <>
      {loading ? (
        <div className="flex items-center justify-center h-screen text-center">
          <div className="w-5 h-5 border-b-2 border-black rounded-full animate-spin"></div>
          <span className="ml-2 font-mono text-md">loading......</span>
        </div>
      ) : data?.length === 0 ? (
        <div className="flex items-center text-xl h-screen justify-center mt-5 font-mono font-bold text-red-600 capitalize">
          <h1>{error ? "Something Went wrong! Please  Try  again" :<div> <h1>No Product for Sell</h1> </div>} </h1>{" "}
        </div>
      ) : (
        <div>
          <h2 className="m-5 mb-4 text-2xl font-bold text-center text-gray-700">
          Unbox Happiness, Unleash Style
          </h2>
          <ul className="grid grid-cols-1 gap-2 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
            {data}
          </ul>
        </div>
      )}

<Toaster />
    </>
  )
}

export default ProductStore


 
  