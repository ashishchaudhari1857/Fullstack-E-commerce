import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import SignUp from './components/authentication/Signupx';
import Login from './components/authentication/SignIn';
import { Route, Routes } from 'react-router-dom';
import AddProduct from './components/admin/addProduct';
import Profile from './components/commonAccounts/profile';
import AdminProducts from './components/admin/adminProducts';
import ProductStore from './components/users/productStore';
import Cart from './components/users/cart';
import Navbar from './components/users/navbar';
function App() {
 
const  role =localStorage.getItem('role');

  return (
    <div className="App">

     {role==="user"  &&  <Navbar></Navbar>  }
   
        {/* <Cart></Cart> */}
      <Routes>

      <Route  path='/signup' element={<SignUp></SignUp>}></Route>
      <Route  path='/login' element={<Login></Login>}></Route>

     { role==="user" &&   <Route index element={<ProductStore></ProductStore>}></Route>  }
     { role==="user" &&   <Route path ='/' element={<ProductStore></ProductStore>}></Route>  }

       < Route  path='/profile' element={<Profile></Profile>}></Route>

      {role==="admin"  &&   <Route  path='/addproduct' element={<AddProduct></AddProduct>}></Route>}
      {role==="admin"  &&   <Route  path='/' element={<AdminProducts></AdminProducts>}></Route>}
      </Routes>
    </div>
    
    
  );
}

export default App;
