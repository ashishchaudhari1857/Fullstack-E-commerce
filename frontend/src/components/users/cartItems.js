import React from 'react';
import { addTocart  ,getCartProducts ,remove_from_cart_api ,remove_from_cart_at_once} from '../../api/cartApis';
import {getcartsProducts}  from  '../../redux/slices/cartSlice';
import { useDispatch ,useSelector } from 'react-redux';
import { setLoading ,setError } from '../../redux/slices/cartSlice';
import { useCallback } from 'react';

function CartItems({ item }) {
  const dispatch=useDispatch();
  const cartId =useSelector((state)=>state.Auth.cartId);
  const AddToCart= async(id ,cartId)=>{
    try {
      
      //  we have to add reachot-toat jhere
     const data =await addTocart(id ,cartId);
     const totolData=await getCartProducts(cartId);
     dispatch(getcartsProducts(totolData))
    } catch (error) {
     handleFetchError(error);
     } 
   }

   const remove_from_cart = useCallback(
    async (id, cartId) => {
      try {
        const data = await remove_from_cart_api(id, cartId);
        const totalData = await getCartProducts(cartId);
        dispatch(getcartsProducts(totalData));
      } catch (error) {
        handleFetchError(error);
      }
    },
    [dispatch]
  );

  const remove_at_once = useCallback(
    async (id, cartId) => {
      try {
        const data = await remove_from_cart_at_once(id, cartId);
    
        const totalData = await getCartProducts(cartId);
        dispatch(getcartsProducts(totalData));
      } catch (error) {
        handleFetchError(error);
      }
    },
    [dispatch]
  );
  const handleFetchError = (error) => {
    if (error.response) {
      setError(error.response.data.message);
    } else if (error.request) {
      setError('Network error. Please try again.');
    } else {
      setError('An unexpected error occurred. Please try again.');
    }
  }


  return (
    <div className="flex items-center justify-between gap-2 p-1 mb-3 text-black bg-white border-b-2 border-gray-100 sm:p-4">
      <div className="flex items-center">
        <img
          src={item?.ImgUrls?.[0]}
          alt="Item"
          className="w-16 h-16 mr-4 rounded-md sm:w-20 sm:h-20"
        />
        <div>
          <h1 className="font-serif text-gray-600 capitalize text-md text-wrap" >{item.name}</h1>
          <p className="text-sm text-gray-400 c">{item.category}</p>
          <h1 className="text-xl font-semibold text-green-500">${item.price}</h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center md:flex-row">
        <div className="mr-4">
          <button onClick={()=>remove_from_cart(item.id ,cartId)} className="px-2 py-1 text-gray-700 bg-gray-200 rounded sm:px-2">
            -
          </button>
          <span className="mx-2">{item.CartProducts.quantity}</span>
          <button className="px-1 py-1 text-gray-700 bg-gray-200 rounded sm:px-2" onClick={()=>AddToCart(item.id ,cartId)}>
            +
          </button>
        </div>
    
        <button   onClick={()=>remove_at_once(item.id ,cartId)} className="mt-1 ml-0 text-red-500 md:mt-0 md:ml-4 hover:text-red-600">
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItems;
