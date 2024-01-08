import React, { useState } from 'react';

const UserProfileUpdate = () => {
  const [userId, setUserId] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('username', newUsername);

      // Append each file to the FormData
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      const response = await fetch('/api/profile/update', {
        method: 'PUT',
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
      <h2>Update Profile</h2>
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
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
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
        <button type="button" onClick={handleUpdateProfile}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfileUpdate;
