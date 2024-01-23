import React from 'react';

function Cards({ data, AddToCart, DeleteProduct, UpdateProduct, BuyProduct }) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md">
      <div className="flex justify-center items-center h-48">
        <img
          src={data?.ImgUrls?.[0]}
          alt="Product Image"
          className="object-cover object-center"
        />
      </div>
      <div className="p-4">
        <h1 className="text-xl font-semibold mb-2">{data?.name}</h1>
        <p className="text-gray-600">Price: ${data?.price}</p>
        <p className="text-gray-600">Category: {data?.category}</p>
      </div>
      <div className="flex justify-between p-4">
        <button
          onClick={AddToCart ? BuyProduct : UpdateProduct}
          className="w-1/2 bg-green-500 text-white py-2 px-2 rounded-md hover:bg-green-600"
        >
          {AddToCart ? 'Buy' : 'Edit'}
        </button>
        <button
          onClick={AddToCart ? AddToCart : DeleteProduct}
          className="w-1/2 bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600"
        >
          {AddToCart ? 'Add' : 'Delete'}
        </button>
      </div>
    </div>
  );
}

export default Cards;
