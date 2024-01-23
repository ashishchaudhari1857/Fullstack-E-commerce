import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getcartsProducts, setLoading ,setError} from '../../redux/slices/cartSlice'
import  {getCartProducts} from '../../api/cartApis'
function Cart({visible ,close } ) {
    const dispatch =useDispatch()
    const cartProducts =useSelector((state)=> state.cart.cartProducts);
    const loading = useSelector((state) => state.cart.loading);
    const error = useSelector((state) => state.cart.error);
    const totalItems = useSelector((state) => state.cart.totalItems);
    const cartId=useSelector((state)=>state.Auth.cartId)
    
    const fetchData = async () => {
        dispatch(setLoading(true))
         try {
          dispatch(setLoading(true));
           const  data = await getCartProducts(cartId);
           dispatch(getcartsProducts(data));
        } catch (error) {
          handleFetchError(error);
        }finally{
          dispatch(setLoading(false))
        }
      };
      

  useEffect(()=>{
    fetchData()
  } ,[dispatch])


  const handleFetchError = (error) => {
    if (error.response) {
      setError(error.response.data.message);
    } else if (error.request) {
      setError('Network error. Please try again.');
    } else {
      setError('An unexpected error occurred. Please try again.');
    }
  };

   if(!visible) return  null;

    

   return (
    <div onClick={close} className='fixed flex justify-center items-center inset-0 bg-black text-white bg-opacity-30 ba ckdrop-blur-sm'>
        <div className='bg-white text-black'>mkc</div>
    </div>
);

}

export default Cart