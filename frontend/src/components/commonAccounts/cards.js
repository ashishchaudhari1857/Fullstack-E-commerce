import React from 'react'

function cards({data ,AddToCart , DeleteProduct, UpdateProduct ,BuyProduct}) {
  return (
    <div>
        <div>
            <img src={data.ImgUrls[0]} ></img>
        </div>
        <div>
             <h1>
                {data.name}
             </h1>
             <h1>
                {data.category}
             </h1>
        </div>
        <div>
            <button onClick={AddToCart? BuyProduct:UpdateProduct} > {AddToCart?"Buy Now":"Edit"}</button>
            <button onClick={AddToCart? AddToCart:DeleteProduct} > {AddToCart?"Add to Cart":"Delete"}</button>
        </div>
    </div>
  )
}

export default cards