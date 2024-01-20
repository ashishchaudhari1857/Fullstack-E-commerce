import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { PiUserCircleFill } from "react-icons/pi";

function Profile() {
  // State variables
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  // Ref for file input
  const fileInputRef = useRef(null);

  // Fetch user profile data
  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/profile/${localStorage.getItem("userId")}`);
      const fetchedData = res.data;
      setData(fetchedData);
      setError(null);
      if (fetchedData) {
        setName(fetchedData.name || '');
        setAddress(fetchedData.address || '');
        setGender(fetchedData.gender || '');
        setPhone(fetchedData.phone || '');
        setDob(fetchedData.dob || '');
      }
    } catch (error) {
      handleFetchError(error);
    }
  };

  // Handle errors during data fetch
  const handleFetchError = (error) => {
    if (error.response) {
      setError(error.response.data.message);
    } else if (error.request) {
      setError('Network error. Please try again.');
    } else {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  // Effect hook to fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Open file input on image click
  const handleFileRef = () => {
    fileInputRef.current.click();
  };

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Submit profile update
  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", localStorage.getItem("userId"));
    formData.append("name", name);
    formData.append("address", address);
    formData.append("gender", gender);
    formData.append("phone", phone);
    formData.append("dob", dob);
    formData.append("file", fileInputRef.current.files[0]);

    try {
      const res = await axios.put("/api/profile/update", formData);
      if (res.status === 200) {
        const updatedProfile = res?.data?.updatedProfile;
        setData(updatedProfile);
        setError(null);
        setIsEditing(false);
        fileInputRef.current.value = '';
      }
    } catch (error) {
      handleFetchError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mb-9 md:flex-row md:justify-around">
      {/* Profile Image Section */}
      <div className="mb-8" onClick={handleFileRef}>
        {data?.ImgUrl ? (
          <img
            src={data?.ImgUrl}
            alt="Profile Image"
            className="w-40 h-40 border-4 border-white rounded-full shadow-md"
          />
        ) : (
          <PiUserCircleFill className="w-40 h-40 text-center text-gray-500"></PiUserCircleFill>
        )}
        <h2 className="font-medium text-center">{data?.bio}</h2>
      </div>
      {/*   form section  */}
      <div className="w-full max-w-md p-6 bg-white rounded-md md:w-[50%]  lg:w-[60%]  xl:w-[70%]  shadow-md md:max-w-2xl">
        <h3 className="mb-12 font-mono font-bold text-center"> Profile</h3>
        <form onSubmit={submitHandler} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="Name"
                className="block text-sm font-medium text-gray-600"
              >
                Name:
              </label>
              <input
                style={{ outline: "none" }}
                className="w-full border-b border-gray-300 focus:outline-none focus:border-black"
                type="text"
                value={isEditing ?name : data?.name || ""}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="Email"
                className="block text-sm font-medium text-gray-600"
              >
                Email:
              </label>
              <input
                style={{ outline: "none" }}
                className="w-full border-b  border-gray-300 focus:outline-none focus:border-black"
                type="email"
                value={data?.email}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="Phone"
              className="block text-sm font-medium text-gray-600"
            >
              Phone:
            </label>
            <input
            required
              style={{ outline: "none" }}
              className="w-full border-b border-gray-300 focus:outline-none focus:border-black"
              type="text"
              value={isEditing ? phone : data?.phone || ""}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="DOB"
              className="block text-sm font-medium text-gray-600"
            >
              DOB:
            </label>
            <input
            required
              style={{ outline: "none" }}
              className="w-full border-b border-gray-300 focus:outline-none focus:border-black"
              type="date"
              value={isEditing ? dob : data?.dob || ""}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="Role"
              className="block text-sm font-medium text-gray-600"
            >
              Role:
            </label>
            <input
              style={{ outline: "none" }}
              className="w-full border-b border-gray-300  capitalize focus:outline-none focus:border-black"
              type="text"
              value={data?.role}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Address
            </label>
            <textarea
              id="description"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
              rows="3"
              onChange={(e) => setAddress(e.target.value)}
              value={isEditing ?address : data?.address || ""}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Gender
            </label>
            <div className="flex items-center space-x-4">
              <label>
                Male:
                <input
                  type="radio"
                  value="male"
                  name="gender"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                  className="ml-2"
                />
              </label>
              <label>
                Female:
                <input
                  type="radio"
                  value="female"
                  name="gender"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                  className="ml-2"
                />
              </label>
            </div>
          </div>
          <div className="flex items-center hidden space-x-2">
            <label
              className="px-4 py-2 text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
              htmlFor="file"
            >
              Choose File
              <input
                type="file"
                id="file"
                className="hidden"
                ref={fileInputRef}
                // onChange={(e) => console.log(e.target.files[0])}  {/* Handle the file here */}
              />
            </label>
            <span className="text-gray-500">No file chosen</span>
          </div>
          {(error ) && (
            <div className="flex items-center justify-center mt-5 font-mono font-bold text-red-600 capitalize">
       {error}   
            </div>
          )}
          <div className="flex justify-end gap-10"> 
            <button
              onClick={handleEditToggle}

              type="button"
              className={`px-4 py-2   text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue`}

            >
               {isEditing ? "Cancel" : "Edit Profile"}
            </button>
            <button
             disabled={!isEditing}
              type="submit"
              className={`px-4 py-2   text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue`}
            >
              {loading ? "Saving..... " : " Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
