const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Profile = require("../models/profile");
const JwtCreator = require("../utilis/jwt-generator");
const Cart = require("../models/cart");
const { findOne } = require("../models/product");
const { use } = require("../routes/product");

const register = async (req, res) => {
  const { username, email, password, role = "user" } = req.body;
  console.log(req.body)
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
      });
    let cart;
    let cardId;

    if (role === "user") {
      cart = await user.createCart({ username: user.username });
      cardId = cart.id;
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
      cardId,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res
        .status(409)
        .json({ status: "conflict", msg: "Email already exists" });
    } else {
      return res.status(500).json({ status: "server error" ,error:error.message});
    }
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
      res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie("role", role, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(201).json({ status: "success", user, token, role });
    } else {
      res.status(401).json({ msg: "Invalid Password!" });
    }
  } catch (error) {
    res.status(500).json({
      status: "login failed",
      message: "Internal Server Error",
      error: error.message,
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
      error: error.message,
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
      error: error.message,
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
      return res.status(400).json({ status: "error", msg: "Please provide a valid email address." });
    } else {
      const user = await User.findOne({ where: { email } });
      
      if (!user) {
        return res.status(404).json({ status: "error", msg: "User not found" });
      }

      // Update user's password
      user.password = hashupdatedPassword;
      await user.save();

      return res.status(200).json({ status: "success", msg: "Password updated successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", msg: "Server error" });
  }
};

module.exports = { register, login, getUsers, getUser ,forgetPassword };
