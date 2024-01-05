const Sequelize = require("sequelize");
const sequelize = require("../config/dbconfig");

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true,
  },
  
});
module.exports = Cart;
