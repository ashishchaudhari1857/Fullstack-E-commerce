import axios from 'axios';
import React, { useRef, useState } from 'react'

function SignUp() {
    const  usernameRef= useRef();
    const passwordRef =useRef();
    const emailRef=useRef();
    const roleRef=useRef();
    const [toggel ,setToggel]=useState();

  const submitHandler =async (e)=>{
        e.preventDefault();
        const obj={
            username:usernameRef.current.value,
            password:passwordRef.current.value,
            email:emailRef.current.value,
            role:roleRef.current.value
        }
       try {
        const res= axios.post('/api/auth/signup',obj);
         console.log(res)
       } catch (error) {
          console.log(error)
       }
        

       
  }



  return (
    <div>
        <h1 className="text-center mt-5">Sign Up</h1>
        <form onSubmit={submitHandler} className='d-flex flex-column align  items-center'>
            <input type='text' placeholder='Enter Username' ref={usernameRef} required/>
            <input type='email' placeholder='Enter email' ref={emailRef} required/>
            <input type={toggel ? "text":"password"} placeholder='Enter password' ref={passwordRef} required/>
            <button onClick={(e)=> setToggel(!toggel)}>{toggel ?"Hide ":"Show"}</button>
            <select ref={roleRef}> 
                <option value="" disabled selected >Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <br/>
        <button type='submit' className='bg-black text-white' >Sign Up</button>
          
        </form>
    </div>
  
  )
}

export default SignUp