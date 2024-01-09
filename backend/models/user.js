// user.js
 const {Sequelize ,DataTypes }=require('sequelize');
 const sequelize=require('../config/dbconfig')
 

const User = sequelize.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email:{
    unique : true,
    type: DataTypes.STRING,
    allowNull:false

  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   role:{
    type:DataTypes.STRING,
   }
});

module.exports = User;
