import React, { useState } from 'react';
import Searchbar from './searchbar';
import { HiMiniShoppingCart } from 'react-icons/hi2';
import { RiAccountCircleLine } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cart from './cart';
function Navbar() {
  const [showCart ,setShowCart]=useState(false)
  const totalitems =useSelector((state)=>state.cart.totalItems)
  const handleclose =(e)=>setShowCart(false);
  return (
    <>
    <div className='flex justify-around items-center p-[0.2rem] bg-black w-full fixed z-10 top-0'>
      <NavLink to ="/"><img src='logo.svg' className='rounded-sm w-10 h-15 bg-black' alt='loading'></img></NavLink>
      <Searchbar />
      <NavLink to="/profile" className='text-white font-bold  font-mono py-2  hover:text-yellow-300  '  >
       <h1 className='flex items-center gap-1 '> <RiAccountCircleLine className='text-xl  '></RiAccountCircleLine><spam className="hidden sm:block"style={{wordSpacing:"-6px" }}> My Account</spam></h1>
     </NavLink> 
     <div className='flex gap-1 items-center text-white hover:text-yellow-300'onClick={(e)=>setShowCart(!showCart)}>
     <HiMiniShoppingCart className=' text-xl '  /> <span className='font-mono font-semibold'>({totalitems})</span>
     </div>
    </div>
    <Cart visible={showCart} close={handleclose}></Cart>
    </>
  ); 
}

export default Navbar;
