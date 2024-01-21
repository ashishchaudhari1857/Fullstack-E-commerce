import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import SignUp from './components/authentication/Signupx';
import Login from './components/authentication/SignIn';
import { Route, Routes } from 'react-router-dom';
import AddProduct from './components/admin/addProduct';
import Profile from './components/commonAccounts/profile';
import AdminProducts from './components/admin/adminProducts';

function App() {
 
 
const  role =localStorage.getItem('role');
  return (
    <div className="App">
      <AdminProducts></AdminProducts>
        <Profile></Profile>
      <Routes>
      {/* {role==="user"  && <Route index element={<Login></Login>}></Route>}
        {role==="" &&<Route  index element={<SignUp></SignUp>}></Route>} */}
        <Route  path='/login' element={<Login></Login>}></Route>
        <Route  path='/signup' element={<SignUp></SignUp>}></Route>
        <Route  path='/addproduct' element={<AddProduct></AddProduct>}></Route>
      </Routes>
    </div>
    
    
  );
}

export default App;
