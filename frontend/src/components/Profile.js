import React, { useState } from 'react';

const Product = () => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('name', name);
   

   
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      const response = await fetch('/api/product/addproduct', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('API Response:', responseData);
        // Handle the response as needed
      } else {
        console.error('Error updating profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h2>Update Profilertrt</h2>
      <form>
        <label>
          User ID:
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </label>
        <br />
        <label>
          New Username:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Profile Pictures:
          <input
            type="file"
            multiple
            onChange={handleFileChange}
          />
        </label>
        <br />
        <button   className="bg-white" type="button" onClick={handleUpdateProfile}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Product;
