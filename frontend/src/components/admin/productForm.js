import React from 'react'

function ProductForm({handleSubmit , productNameRef , priceRef ,descriptionRef ,stockRef ,categoryRef, handleFileChange  ,loading ,error }) {
  return (
    <div className="max-w-md p-8 mx-auto mt-8 bg-white rounded shadow-lg">
    <h2 className="mb-5 font-mono text-2xl font-semibold text-center">
      {" "}
      Product Form
    </h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label
          htmlFor="productName"
          className="block text-sm font-medium text-gray-600"
        >
          Product Name
        </label>
        <input
          required
          type="text"
          id="productName"
          ref={productNameRef}
          className="w-full p-1 mt-1 border rounded-md"
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-600"
        >
          Price
        </label>
        <input
          type="number"
          id="price"
          ref={priceRef}
          className="w-full p-1 mt-1 border rounded-md"
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-600"
        >
          Description
        </label>
        <textarea
          id="description"
          ref={descriptionRef}
          className="w-full p-1 mt-1 border rounded-md"
          rows="3"
        ></textarea>
      </div>
      <div className="mb-3">
        <label
          htmlFor="stock"
          className="block text-sm font-medium text-gray-600"
        >
          Stock
        </label>
        <input
          type="number"
          required
          id="stock"
          ref={stockRef}
          className="w-full p-1 mt-1 border rounded-md"
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="stock"
          className="block text-sm font-medium text-gray-600"
        >
          Category
        </label>
        <input
          type="text"
          required
          id="category"
          ref={categoryRef}
          className="w-full p-1 mt-1 border rounded-md"
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="photos"
          className="block text-sm font-medium text-gray-600"
        >
          Pictures
        </label>
        <input
          type="file"
          id="file"
          multiple
          onChange={handleFileChange}
          className="w-full p-1 mt-1 text-sm border rounded-md"
        />
      </div>
      <button
        type="submit"
        className="p-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        {loading ? "Submitting......." : "Submit"}
      </button>
      {error && (
        <div className="flex items-center justify-center mt-5 font-mono font-bold text-red-600 capitalize">
          {error}
        </div>
      )}
    </form>
  </div>
  )
}

export default ProductForm