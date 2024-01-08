const { where } = require("../config/dbconfig");
const Cart = require("../models/cart");
const Product = require("../models/product");
const { findByPk } = require("../models/profile");
const User = require("../models/user");
const Sequelize=require('sequelize')

const createCart = async (req, res) => {
  try {
    const { userId } = req.body;
    let cart;

    const user = await User.findByPk(userId);

    if (user) {
      cart = await user.createCart( {username:user.username});
      
    } else {
      return res.status(400).json({
        status: "failed",
        error: "User not found",
        message: "User not found",
      });
    }

    return res.status(201).json({
      message: "Cart created successfully",
      success: true,
      data: cart,
      cartId: cart.id,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      error: error.message,
      message: "Internal server error",
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const { cartId, productId, quantity } = req.body;
    console.log(cartId)
    const cart = await Cart.findByPk(cartId);
    const product = await Product.findByPk(productId);

    if (!cart) return res.status(404).json({ status: 'failed', message: 'Cart not found' });
    if (!product) return res.status(404).json({ status: 'failed', message: 'Product not found' });
            
    const existingCartItem = await cart.getProducts({ where: { id: product.id } });
    if (existingCartItem.length > 0) {
      const updatedCartItem = existingCartItem[0].CartProducts;
      await updatedCartItem.update({ quantity: Sequelize.literal(`quantity + ${parseInt(quantity) || 1}`) });

      return res.status(200).json({
        status: 'success',
        message: `Quantity updated for ${product.name} in the cart`,
        data: updatedCartItem,
      });
    } else {
      const cartItem = await cart.addProduct(product, { through: { quantity: parseInt(quantity) || 1 } });
 
      return res.status(201).json({
        status: 'success',
        message: `Added ${product.name} to the cart`,
        data: cartItem,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'failed',
      message: 'Failed to add the cart',
      data: [],
      error: error.message,
    });
  }
};

  const remove_from_cart =async(req,res)=>{
    const {cartId , productId}=req.params;
  
    try {
      const cart = await Cart.findByPk(cartId);
      const product= await  Product.findByPk(productId);
      if (!cart) return res.status(404).json({ status: 'failed', message: 'Cart not found' });
      if (!product) return res.status(404).json({ status: 'failed', message: 'Product not found' });

       const existingCartItem = await cart.getProducts({ where: { id: product.id } });
      
      if(!existingCartItem && existingCartItem.length===0)return res.status(404).json({ status: 'failed', message: 'Product not found in cart' })

      const updatedCartItem = existingCartItem[0].CartProducts;
    if(updatedCartItem.quantity ===1){
      await existingCartItem.destroy();
      return res.status(200).json({
        status: 'success',
        message: `delete successfully`,
        data: updatedCartItem,
      });
    }else{
      await updatedCartItem.update({ quantity: Sequelize.literal(`quantity - 1`) });


      return res.status(200).json({
        status: 'success',
        message: `delete successfully`,
        data:  updatedCartItem,
      });
    }

    } catch (error) {
      return res.status(500).json({
        status: 'failed',
        message: 'Failed to delete item',
        data: [],
        error: error.message,
      });
    }
    
  }
   const getCart= async(req ,res)=>{
       const  {cartId} =req.params;
        try {
          const cart = await Cart.findByPk(cartId);
          if (!cart) return res.status(404).json({ status: 'failed', message: 'Cart not found' })
          const cartdata=await cart.getProducts()
           res.status(200).json({status:"success" ,result:[cartdata]})
        } catch (error) {
          return res.status(500).json({
            status: 'failed',
            message: 'Failed load cart',
            data: [],
            error: error.message,
          });
        }
   }
   
module.exports = {
  create_cart: createCart,
  add_to_cart: addToCart,
  remove_from_cart: remove_from_cart,
  getCart:getCart
};
