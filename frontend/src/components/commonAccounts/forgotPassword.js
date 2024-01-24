import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  const handleResetPassword = async () => {
    try {
         const obj={
            email:email,
            password:newPassword
         }
      const response = await axios.post('/api/auth/forget/' , obj)

      if (response.status===200) {
        setError(null);
        navigate('/login')
      } else {
       
        setError(error.response.data.message || 'Password reset failed');
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-md w-90">
        <h2 className="text-2xl font-bold mb-4 text-center capitalize text-blue-500 font-sans">Reset Password</h2>


        {error && <div className="text-red-500 mb-4 font-serif">{error}</div>}

        <label className="block mb-2 font-serif" htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="block mb-2 font-serif" htmlFor="newPassword">
          New Password:
          <input
            type="password"
            id="newPassword"
            className="w-full border p-2 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>

       <div className='flex justify-around items-center'>
       <button
          className="bg-cyan-blue text-black bg-gray-500 py-1 px-4 rounded  font-mono  font-semibold hover:bg-cyan-500"
          onClick={handleResetPassword}
        >
              <NavLink to='/login'>Discard</NavLink>
        </button>
        <button
          className="bg-cyan-blue text-black   bg-blue-500  py-1 px-4 rounded font-mono  font-semibold hover:bg-cyan-500"
          onClick={handleResetPassword}
        >
          Reset Password
       
        </button>
       </div>
      </div>
    </div>
  );
};

export default ResetPassword;
