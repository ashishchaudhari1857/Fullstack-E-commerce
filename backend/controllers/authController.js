const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Profile = require("../models/profile");
const JwtCreator = require("../utilis/jwt-generator");

const register = async (req, res) => {
  const { username, email, password, role = "user" } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    const profile = await user.createProfile({
      user_id: user.id,
      userId: user.id,
      email,
    });

    const token = JwtCreator(email, user.id);

    res.cookie("jwt", token, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.cookie("role", role, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });

    res.status(201).json({
      status: "success", user, role,token, profile});
  } 
  catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ status: "conflict", msg: "Email already exists" });
    } else {
      return res.status(500).json({ status: "server error" });
    }
  }
};

const login = async (req, res) => {
  const { email, password  } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ status: "login failed", message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = JwtCreator(email, user.id);
          const role=user.role;
      res.cookie("jwt", token, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.cookie("role", role, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.status(201).json({ status: "success", user, token ,role });
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
    const user = await User.findOne({ where: { id: userId }, include: [Profile] });
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

module.exports = { register, login, getUsers, getUser };
