const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Profile = require("../models/profile");
const JwtCreator = require("../utilis/jwt-generator");
const Cart = require("../models/cart");
const { findOne } = require("../models/product");
const { use } = require("../routes/product");
const validator =require('validator')
const register = async (req, res) => {
  const { username, email, password, role = "user" } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const  user = await User.create({
        username,
        email,
        password: hashedPassword,
        role: role || "user",
      });
     const  profile = await user.createProfile({
        userId: user.id,
        email,
        role,
        username,
      });
    let cart;
    let cartId;

    if (role === "user") {
      cart = await user.createCart({ username: user.username });
      cartId = cart.id;
    }
    const token = JwtCreator(email, user.id);

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.cookie("role", role, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(201).json({
      status: "success",
      user,
      role,
      token,
      profile,
      cartId,
    });
  } catch (error) {
      return res.status(500).json({ status: "server error" ,message:error.errors[0].message});
    
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({ status: "login failed", message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = JwtCreator(email, user.id);
      const role = user.role;

      const cart = await Cart.findOne({ where: { userId: user.id } });
      const cartId = cart ? cart.id : null;

      res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie("role", role, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(201).json({ status: "success", user, token, role ,cartId });
    } else {
      res.status(401).json({ message: "Invalid Password!" });
    }
  } catch (error) {
    res.status(500).json({
      status: "login failed",
      message: "Internal Server Error",
      error: error.errors[0].message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll({ include: [Profile] });
    res.status(200).json({
      status: "success",
      results: allUsers,
      message: "Users fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.errors[0].message,
      message: "Internal Server Error",
    });
  }
};

const getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({
      where: { id: userId },
      include: [Profile],
    });
    res.status(200).json({
      status: "success",
      results: user,
      message: "User fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.errors[0].message,
      message: "Internal Server Error",
    });
  }
};
 
const forgetPassword = async (req, res) => {
  try {
    let email = req.body.email;
    let updatedPassword = req.body.password;
    const hashupdatedPassword = await bcrypt.hash(updatedPassword, 10);

    if (!validator.isEmail(email)) {
      return res.status(400).json({ status: "error", message: "Please provide a valid email address." });
    } else {
      const user = await User.findOne({ where: { email } });
      
      if (!user) {
        return res.status(404).json({ status: "error", message: "User not found" });
      }

      // Update user's password
      user.password = hashupdatedPassword;
      await user.save();

      return res.status(200).json({ status: "success", message: "Password updated successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: error.errors[0].message });
  }
};

module.exports = { register, login, getUsers, getUser ,forgetPassword };
