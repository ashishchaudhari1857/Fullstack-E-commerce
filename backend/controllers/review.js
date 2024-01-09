const Review = require("../models/review");
const Product = require("../models/product");
 const User =require('../models/user')
const AddReviewTo = async (req, res) => {
  const { id } = req.params;
  const { rating, description ,userId} = req.body;

  try {
    const product = await Product.findOne({ where: { id } });
    const user =await User.findOne({where:{id:userId}});
    if (!product) {
      res.status(400).json({ mes: "no product found" });
    }
    if (!user) {
      res.status(400).json({ mes: "no user found" });
    }
    // const review = await Review.create ({})  *case
    // this alao work fine but we have to pass the productId explicitly 
    // sequelize generate functions to handle the association without setting  product id explicitly
      const review = await product.createReview({
      rating,
      description,
      userId 
    });

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ err: "internal server error" });
  }
};



const getReview = async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = await Review.findAll({
      where: { productId: id },
      include: [Product],
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "internal server error k" });
  }
};


module.exports={
    AddReviewTo,
    getReview
}