import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
 

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to login');
      }

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <div className="App">
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
            
              ref={emailRef}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
             
              ref={passwordRef}
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default App;
