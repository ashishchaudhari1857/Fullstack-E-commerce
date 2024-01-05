const  sequelize =require('../config/dbconfig');
const Sequelize =require('sequelize')
const CartProducts = sequelize.define('CartProducts', {
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
  });

  module.exports=CartProducts;