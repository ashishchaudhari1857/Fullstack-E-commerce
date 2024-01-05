const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Profile = require('../models/profile');
const JwtCreator = require('../utilis/jwt-generator');

const register = async (req, res) => {
  const { username, email, password, role = "user" } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role:role||"user"
    });
    const token = JwtCreator(email, user.id);
    res.cookie('jwt', token, {  maxAge: 7 * 24 * 60 * 60 * 1000,  httpOnly: true, });
    res.cookie('role' , role,{ maxAge: 7 * 24 * 60 * 60 * 1000,  httpOnly: true,})
    res.status(201).json({ status: "success", user, role  ,token});
  } catch (error) {

    if (error.code === "23505") {
      return res.status(409).json({ status: "conflict", msg: "Email already exists" });
    } else {
      return res.status(500).json({ status: "server error" });
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = JwtCreator(email, user.id);
        res.cookie('jwt', token, {  maxAge: 7 * 24 * 60 * 60 * 1000,  httpOnly: true, });
        // res.cookie('role' , role,{ maxAge: 7 * 24 * 60 * 60 * 1000,  httpOnly: true,})
        res.status(201).json({ status: "success", user  ,token});
      } else {
        return res.status(401).json({ msg: "Invalid Password!" });
      }
    } else {
      res.status(404).json({ status: "login failed", message: "User does not exist" });
    }
  } catch (error) {
    res.status(500).json({ status: "login failed", message: "Internal Server Error", error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll({ include: [Profile] });
    res.status(200).json({ status: "success", results: allUsers, message: "Users fetched successfully" });
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message, message: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
  getUsers
};
