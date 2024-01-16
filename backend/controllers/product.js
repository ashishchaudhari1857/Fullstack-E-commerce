const { where, Sequelize } = require("../config/dbconfig");
const Products = require("../models/product");
const Review = require("../models/review");
const User  =require('../models/user')
const {uploadOnCloudinary} =require('../utilis/cloudnary')

const addProduct = async (req, res) => {
  try {
    let productCreate = await Products.create({
      name: req.body.name,
      description: req.body.description,
      price: parseFloat(req.body.price),
      stock: parseFloat(req.body.stock),
      userId:req.body.userId,
    });

    if (req.files && req.files.length > 0) {
      const cloudinaryUrls = [];

      for (let i = 0; i < req.files.length; i++) {
        const cloudinaryResponse = await uploadOnCloudinary(req.files[i].path);
        cloudinaryUrls.push(cloudinaryResponse.secure_url);
      }
        productCreate.ImgUrls = cloudinaryUrls;
    }
    productCreate.save();
    res.status(200).json(productCreate);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error",message: "Internal Server Error"});
  }
};


const getAdminProducts = async (req, res) => {
  try {
    const { userId } = req.params;
    const adminUser = await User.findOne({
      where: { id: userId, role: "admin" },
    });

    if (!adminUser) {
      return res.status(401).json({
        message: 'You are not authorized to perform this action.',
      });
    }

    const products = await adminUser.getProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const SearchQuery = async (req, res) => {
  const  {name}  = req.query;

  try {
    const products = await Products.findAll({ where:{name:{
      [Sequelize.Op.iLike]:`%${name}%`
}} ,include:[Review]});


    return res.status(200).json({ products});
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


// put
const updateProduct =async (req, res)=>{
    const { id ,userId }=req.params;
    const  user =await User.findOne({where:{id:userId}});
    if(!user){
          return res.status(400).json('The user does not exist')
    }
    const productExist=await Products.findOne({where:{id:id ,userId:userId}});
    if(!productExist){
      return res.status(404).json({ error: 'Product not found or u are not authorized to update  the product' });
    }
    //  WE can also do  like  productExist.name=req.body.name  AND then calling save ()
    const updatedProduct=await Products.update(req.body ,{where:{id}});
    res.status(200).json(updatedProduct)
  
}

const deleteProduct = async (req, res) => {
  const { id ,userId }=req.params;
 
    try {
      const  user =await User.findOne({where:{id:userId}});
        if(!user){
            return res.status(400).json('No owner is  present ')
                  }
      const productExist=await Products.findOne({where:{id:id ,userId:userId}});

        if (!productExist) {
            return res.status(404).json({ error: 'Product not found or u are not authorized to delete  the product' });
        }

        // Delete the product from the database
        await productExist.destroy();

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.findAll({include:[Review]});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).res.json({ error: "problem" });
  }
};


const getSingleProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const product =await Products.findOne({where:{id} ,include:[Review]})
       res.status(200).json(product)
  } catch (err) {
    return res.status(400).json("Invalid ID");
  }
};

module.exports={
    addProduct,
    updateProduct,
    deleteProduct,
    getAdminProducts,
    getSingleProduct,
    getAllProducts,
    SearchQuery

}