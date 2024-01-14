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
    unique:true
      },
   role:{
    type:DataTypes.STRING,
   },
   indexes: 
  [
    {
      unique: true,
      fields: ['email', 'role']
    }
  ]
});

module.exports = User;
