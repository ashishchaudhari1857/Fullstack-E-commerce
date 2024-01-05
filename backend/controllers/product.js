const Products = require("../models/product");
const Review = require("../models/review");

const addProduct = async (req, res) => {
  try {
    let productCreate = await Products.create({
      name: req.body.name,
      description: req.body.description,
      price: parseFloat(req.body.price),
    });
    productCreate.save();
    res.status(200).json(productCreate);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
    //   const product =await Products.findByPk(id);
    const product =await Products.findOne({where:{id} ,include:[Review]})
       res.status(200).json(product)
  } catch (err) {
    return res.status(400).json("Invalid ID");
  }
};
// put
const updateProduct =async (req, res)=>{
    //check if the product exists in the database
    const { id }=req.params;
    const productExist=await Products.findByPk(id);
    if(!productExist){
        return res.status(400).json('The product does not exist')
    }
    //  WE can also do  like  productExist.name=req.body.name  AND then calling save ()
    const updatedProduct=await Products.update(req.body ,{where:{id}});
    res.status(200).json(updatedProduct)
  
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const productExist = await Products.findByPk(id);

        if (!productExist) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Delete the product from the database
        await productExist.destroy();

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports={
    getAllProducts,
    addProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct

}