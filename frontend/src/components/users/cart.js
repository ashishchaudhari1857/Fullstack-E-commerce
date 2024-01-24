import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getcartsProducts, setLoading, setError } from '../../redux/slices/cartSlice';
import { getCartProducts } from '../../api/cartApis';
import CartItems from './cartItems';
import { NavLink } from 'react-router-dom';

function Cart({ visible, close }) {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const cartId = useSelector((state) => state.Auth.cartId);

  const handleclose = (e) => {
    if (e.target.id === 'container') close();
  };

  const fetchData = async () => {
    dispatch(setLoading(true));
    try {
      dispatch(setLoading(true));
      const data = await getCartProducts(cartId);
      dispatch(getcartsProducts(data));
    } catch (error) {
      handleFetchError(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup: Restore body scrolling when the component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [visible ,dispatch]);

  const handleFetchError = (error) => {
    if (error.response) {
      setError(error.response.data.message);
    } else if (error.request) {
      setError('Network error. Please try again.');
    } else {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  if (!visible) return null;

  const result = cartProducts?.map((item, index) => (
    <CartItems item={item} key={index}></CartItems>
  ));

  return (
    <div onClick={handleclose} id='container' className='fixed inset-0 z-10 flex flex-col items-center justify-center text-white bg-black rounded-md bg-opacity-30 backdrop-blur-sm'>
      <div className='bg-white sm:h-[92vh] md:w-[70vw] lg:w-[45vw] w-[93vw] h-[75vh] '>
      
        <h1 className='m-3 font-mono text-xl font-bold text-center text-black capitalize'>your cart</h1>
        <h1 className='flex justify-around font-mono font-semibold text-black capitalize bg-gray-400'>
          <span>Item</span><span> quantity</span>
        </h1>
        <hr></hr>
        <div className='overflow-y-scroll '>
          {result?.length===0? <div  className='flex items-center h-80  font-serif text-xl font-semibold justify-center flex-col text-black'>
            <span>No item Present In your  Cart </span> <span className='font-mono capitalize'><NavLink to='/' onClick={close}> start shopping</NavLink></span></div>:result}
        </div>
        <div className={`m-1 ml-5 text-xl text-black    ${result?.length===0 ?"hidden":"block"}`} > 
          <h1 ><span className='font-serif font-bold'>TotalItems:</span><span className='m-1 font-semibold text-gray-500 ' >{totalItems}</span></h1>

          <h1 ><span className='font-serif font-bold'>TotalAmount:</span ><span className='m-1 font-semibold text-gray-500 '>{totalPrice} $</span> </h1>
          <hr></hr>
        </div>
        <div className= {`  items-center justify-end gap-1 text-black ${result?.length===0 ?"hidden":"flex"}`}>
          <button  onClick={close} className='px-[0.5rem]  py-[0.1rem] mx-1 font-mono bg-gray-400 rounded-md '>Close</button>
          <button className='px-[0.5rem]  py-[0.1rem]  mx-3 font-mono bg-blue-400 rounded-md' style={{wordSpacing:'-6px'}} >Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
