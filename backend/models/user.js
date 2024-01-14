// user.js
const sequelize = require("../config/dbconfig");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "user",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
    },
  },
  {
    indexes: [
      { unique:true,
        fields: ["email", "role"],
      },
    ],
  }
);

module.exports = User;
