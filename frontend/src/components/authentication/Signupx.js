import axios from "axios";
import React, { useRef, useState } from "react";
import { PiUserCircleFill } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { useDispatch ,useSelector } from 'react-redux' 
import { useNavigate } from "react-router-dom";
import  { setShowLoginForm ,setShowPassword ,setError ,setLoading ,login  } from  '../../redux/slices/loginslice'
function SignUp() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const roleRef = useRef();
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const loading=useSelector((state)=>state.Auth.loading);
  const showPassword=useSelector((state)=>state.Auth.showPassword)
  const error=useSelector((state)=>state.Auth.error)
  const showLoginForm=useSelector((state)=>state.Auth.showLoginForm)  //  this  is use for responsive design

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true))
    const obj = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
      role: roleRef.current.value,
    };

    try {
      
      const res = await axios.post("/api/auth/signup", obj);
     
      if(res.status===201){
       dispatch(login(res?.data))
       {res?.data?.user?.role ==='user'?  navigate('/'):navigate('/dashboard')}
      }

      dispatch(setError(null))
    } catch (error) {
      if (error.response) {
        dispatch( setError((error.response.data.message)))
       } else if (error.request) {
          dispatch( setError('Network error. Please try again.'))
       } else {
          dispatch( setError('An unexpected error occurred. Please try again.'))
       }
     }finally{
       dispatch(setLoading(false))
     }

    usernameRef.current.value="";
  passwordRef.current.value="";
  emailRef.current.value="";
   roleRef.current.value=""
  };

  return (
    <div className="bg-gradient-to-r from-[#131336] via-[#7088c2] to-[#0d0d33] h-[100vh] flex items-center justify-center">
      <div className="flex bg-white w-[80%] h-[80%] justify-evenly rounded-lg shadow-2xl">
        <div className={`w-[100%] md:w-[48%] relative flex justify-center ${showLoginForm ? 'hidden md:flex' : 'md:flex'}`}>
          <div className="absolute text-[#eedeee] text-center top-[15%]">
            <p className="font-mono text-3xl font-bold capitalize shadow-2xl underline-offset-4">
              Welcome to E-shop{" "}
            </p>
          </div>
          <img src="logo.svg" alt="Additional Image" className="absolute m-4 rounded-full h-14 w-14" />
          <div
            onClick={() => dispatch(setShowLoginForm())}
            style={{ fontFamily: "cursive" }}
            className="absolute font-bold font-cursive w-42 shadow-3xl top-[46%] left-[10%] animate-bounce  rounded-md bg-[rgba(255, 255, 255, 0.2)] text-green-300 block md:hidden transition-transform transform hover:scale-110 hover:bg-yellow-400 hover:text-white cursor-pointer"
          >
            Click here to Signup
          </div>

          <div style={{ fontFamily: "monospace" }} className="absolute text-[#e6c2e6] font-serif top-[65%] lg:top-[72%]" >
            <p className="text-center p-2 text-[1rem] ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sequi minima molestias accusamus voluptate inventore
              in vitae ipsam facere ab.
            </p>
          </div>

          <img src="loginbg.png" alt="Login Background" className="h-[80vh] object-fit w-full rounded-md" />
        </div>

        <div className={`w-[100%] md:w-[60%] flex-col md:flex ${showLoginForm ? 'flex' : 'hidden md:flex'} justify-center p-6 rounded-lg sm:p-14  bg-gray-200`}>
          <div className="flex flex-col items-center justify-center text-center">
            <PiUserCircleFill className="text-3xl"></PiUserCircleFill>
            <h1 className="m-1 text-2xl font-semibold text-center text-blue-700 capitalize" style={{ fontFamily: "fantasy" }}>
              Sign Up
            </h1>
          </div>
          <form onSubmit={submitHandler} className="flex flex-col gap-2 " style={{ fontFamily: "serif" }}>
            <label htmlFor="USERNAME">Username</label>
            <input
              style={{ outline: "none" }}
              className="bg-gray-200 border-b border-black"
              type="text"
              ref={usernameRef}
              required
            />
            <label htmlFor="EMAIL">Email</label>
            <input
              style={{ outline: "none" }}
              className="bg-gray-200 border-b border-black"
              type="email"
              ref={emailRef}
              required
            />
            <label htmlFor="PASSWORD">Password</label>
            <div className="flex justify-between">
              <input
                style={{ outline: "none" }}
                className="border-b border-black w-[100%] bg-gray-200"
                type={showPassword ? "text" : "password"}
                ref={passwordRef}
                required
              />
              <button
                type="button"
                className="text-blue-700 underline cursor-pointer"
                onClick={() => dispatch(setShowPassword())}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="flex items-center justify-between bg-gray-200">
              <select
                ref={roleRef}
                defaultValue=""
                className="w-[50%] border-b border-black mt-4 bg-gray-200"
                style={{ outline: "none" }}
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <br />
              <button
                type="submit"
                className={`bg-red-500  p-1 w-[30%] ${loading?"w-[40%]":"w-[30%]"} m-auto  mt-4 rounded-lg hover:bg-green-400`}
              >
                {loading ? <div className="flex items-center justify-center ">
                 <div className="w-5 h-5 md:h-3 md:w-3  border-b-2 border-black rounded-full animate-spin "></div>
               <span className="ml-2 font-mono p-1  text-sm hidden md:block">Signing....</span>
                      </div>:"Sign Up"}
              </button>
            </div>
          </form>
        {error && <div className="flex items-center justify-center mt-5 font-mono font-bold text-red-600 capitalize">{error}</div>}

          <div className="flex items-center justify-center mt-3 text-center md:mt-5" style={{ fontFamily: "cursive" }}>
            Already have an account? <NavLink to="/login" className="text-blue-500">Login</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
