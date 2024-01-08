const sequelize = require('../config/dbconfig');
const Sequelize = require('sequelize');

const Products = sequelize.define('products', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0.00,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  ImgUrls: {
    type: Sequelize.JSON, 
    allowNull: true,
  },
});

module.exports = Products;
