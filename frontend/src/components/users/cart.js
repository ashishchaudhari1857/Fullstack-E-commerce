import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getcartsProducts, setLoading ,setError} from '../../redux/slices/cartSlice'
import  {getCartProducts} from '../../api/cartApis'
function Cart() {
    const dispatch =useDispatch()
    const cartProducts =useSelector((state)=> state.cart.cartProducts);
    const loading = useSelector((state) => state.cart.loading);
    const error = useSelector((state) => state.cart.error);
    const totalItems = useSelector((state) => state.cart.totalItems);
    const fetchData = async () => {
        dispatch(setLoading(true))
         try {
          dispatch(setLoading(true));
           const  data = await getCartProducts();
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


  return (
    <div>cart</div>
  )
}

export default Cart