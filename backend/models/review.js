const sequelize = require('../config/dbconfig');
const Sequelize = require('sequelize');

const Reviews = sequelize.define("review", {
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  }
},
{
  indexes: 
  [
    {
      unique: true,
      fields: ['productId', 'userId']
    }
  ]
});

module.exports = Reviews;
