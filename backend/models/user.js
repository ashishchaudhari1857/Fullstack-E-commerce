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
    type: DataTypes.STRING

  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
