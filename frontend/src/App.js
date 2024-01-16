import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import SignUp from './components/authentication/Signupx';
import Login from './components/authentication/SignIn';
import { Route, Routes } from 'react-router-dom';
function App() {
 
 

  return (
    <div className="App">
      
      <Routes>
        <Route  path='/login' element={<Login></Login>}></Route>
        <Route  path='/signup' element={<SignUp></SignUp>}></Route>
      </Routes>
    </div>
    
  );
}

export default App;
