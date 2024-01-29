import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../api/useFetch';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const params = useParams();
  const navigate=useNavigate() 
  const { productId } = params;
  const [current, setCurrent] = useState(0);
  const { data, error, loading } = useFetch(`/api/product/${productId}`);

  return (
    <div className="flex gap-1 justify-center h-scree p-2">
      <div className="w-[10vw] flex flex-col  space-y-2">
        {data?.ImgUrls?.map((url, index) => (
          <img
            src={url}
            className={`w-16 h-16 rounded-sm  cursor-pointer ${
              current === index ? 'opacity-100' : 'opacity-50'
            }`}
            alt="loading"
            key={index}
            onClick={() => setCurrent(index)}
          ></img>
        ))}
      </div>
      <div className="w-[40vw] flex justify-center items-center object-cover ">

        <img
          src={data?.ImgUrls?.[current]}
          className=" h-[70vh] rounded-sm shadow-lg"
          alt="loading"
        />
      </div>
      <div className="w-[50vw]  flex flex-col  p-10 bg-white rounded-lg shadow-lg">
     
        <div className="flex  mb-2">
          <span className="text-gray-600 mr-2 font-semibold">Rating:</span>
          <span className="text-yellow-500">{data?.rating}</span>
        </div>
        <h1 className="text-xl font-bold mb-4 text-gray-700" style={{fontFamily:"cursive"}}>{data?.name}</h1>

        <div className="flex items-center mb-2">
          <span className="text-gray-600 mr-2 font-semibold">Price:</span>
          <span className="text-green-600 font-bold">${data?.price}</span>
        </div>

        <div className="flex space-x-4 mb-10">
          <button className=" bg-transparent  text-orange-600 border-2 p-1 px-3 rounded-md  focus:outline-none">
            Add to Cart
          </button>
          <button className="bg-green-500 text-white p-1 px-3  rounded-md hover:bg-green-600 focus:outline-none">
            Buy Now
          </button>
        </div>
        <div className="flex items-center mb-2">
          <span className="text-gray-600 mr-2 font-semibold">Description:</span>
          <span className="text-gray-600 font-sans capitalize">{data?.description}</span>
        </div>
        
        
        <div className="flex items-center mb-2">
          <span className="text-gray-600 mr-2 font-semibold">Category:</span>
          <span className="text-gray-600">{data?.category}</span>
        </div>
       
      </div>
    </div>
  );
};

export default ProductDetail;
