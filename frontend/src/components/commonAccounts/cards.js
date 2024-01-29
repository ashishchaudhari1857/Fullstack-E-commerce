import React from "react";
import { Link } from "react-router-dom";

function Cards({ data, AddToCart, DeleteProduct, UpdateProduct, BuyProduct }) {
  return (
    <div className="max-w-md p-2 mx-auto overflow-hidden rounded-md shadow-md ">
      <Link to={`product_details/${data?.id}`}>
        <div className="flex items-center justify-center p-2 rounded-md h-60 ">
          <img
            src={data?.ImgUrls?.[0]}
            alt="Product Image"
            className="object-cover object-center rounded-md w-72 h-60"
          />
        </div>
        <div className="p-2">
          <h1 className="mb-2 text-2xl font-semibold text-blue-800 capitalize">
            {data?.name}
          </h1>
          <p className="mb-2 text-gray-700">
            <span className="font-semibold">Price:</span>{" "}
            <span className="text-green-600 font-bold">${data?.price}</span>
          </p>
          <p className="mb-2 text-gray-700">
            <span className="font-semibold">Category:</span>{" "}
            <span className="text-purple-500">{data?.category}</span>
          </p>
          <p className="mb-4 text-gray-700">
            <span className="font-semibold">Stock:</span>{" "}
            <span>{data?.stock}</span>
          </p>
        </div>
      </Link>

      <div className="flex justify-between gap-4 p-2">
        <button
          onClick={AddToCart ? BuyProduct : UpdateProduct}
          className="w-1/3 p-1 text-white bg-gray-500 rounded-md hover:bg-green-600"
        >
          {AddToCart ? "Buy" : "Edit"}
        </button>
        <button
          onClick={AddToCart ? AddToCart : DeleteProduct}
          className="w-1/3 p-1 text-white bg-purple-400 rounded-md hover:bg-blue-600"
        >
          {AddToCart ? "Add" : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default Cards;
