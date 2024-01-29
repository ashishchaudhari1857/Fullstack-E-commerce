import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import SignUp from './components/authentication/Signupx';
import Login from './components/authentication/SignIn';
import { Route, Routes } from 'react-router-dom';
import AddProduct from './components/admin/addProduct';
import Profile from './components/commonAccounts/profile';
import AdminProducts from './components/admin/adminProducts';
import ProductStore from './components/users/productStore';
import Navbar from './components/users/navbar';
import ResetPassword from './components/commonAccounts/forgotPassword';
import ProductDetail from './components/commonAccounts/ProductDetail';
function App() {
 
const  role = useSelector((state)=>state.Auth.role)
const  token = useSelector((state)=>state.Auth.role)

  return (
    <div className="App">

     {(role==="user" && token ) &&  <Navbar></Navbar>  }
   
      <Routes>
      {!token && <Route  index element={<SignUp></SignUp>}></Route>  }
      {!token &&  <Route  path='/signup' element={<SignUp></SignUp>}></Route>}
      { !token && <Route  path='/login' element={<Login></Login>}></Route>  }
        <Route path='/forgetpassword' element={<ResetPassword></ResetPassword>}></Route>
      { role==="user" &&   <Route index element={<ProductStore></ProductStore>}></Route>  }
      { role==="user" &&   <Route path ='/' element={<ProductStore></ProductStore>}></Route>  }

    { token &&  < Route  path='/profile' element={<Profile></Profile>}></Route>}
    { token &&  < Route  path='/product_details/:productId' element={<ProductDetail></ProductDetail>}></Route>}
      {role==="admin"  &&   <Route  path='/addproduct' element={<AddProduct></AddProduct>}></Route>}
      {role==="admin"  &&   <Route  path='/' element={<AdminProducts></AdminProducts>}></Route>}
      </Routes>
    </div>
    
    
  );
}

export default App;
