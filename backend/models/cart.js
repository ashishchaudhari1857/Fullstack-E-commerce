const Sequelize = require("sequelize");
const sequelize = require("../config/dbconfig");

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true,
  },
  username:{
    type : Sequelize.STRING(50),
    allowNull: false,
  }
},
{

  indexes: 
  [
    {
      unique: true,
      fields: ['id', 'userId']
    }
  ]
  
});
module.exports = Cart;
