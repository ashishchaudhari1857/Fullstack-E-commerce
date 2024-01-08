const jwt = require("jsonwebtoken");
require('dotenv').config();
const userCheck = (req, res, next) => {
  const token = req.cookies.jwt;
  const role = req.cookies.role;

  if (!token || role!=="user") {
    return res.status(402).json({ message: "Please login as user" });
  }
  jwt.verify(token, process.env.TOKENSECRETKEY , (err, decodedToken) => {
    if (err) {
      return res.status(402).json({ message: "Please login" });
    }

    req.decodedToken = decodedToken; // Store decoded token in request for later use
    next();
  });
};

const adminCheck = (req, res, next) => {
  const token = req.cookies.jwt;
  const role = req.cookies.role;

  if (!token || role!=="admin") {
    return res.status(402).json({ message: "Please login as Admin" });
  }

  jwt.verify(token, process.env.TOKENSECRETKEY, (err, decodedToken) => {
    if (err) {
      return res.status(402).json({ message: "Please login  as Admin" });
    }

    req.decodedToken = decodedToken; // Store decoded token in request for later use
    next();
  });
};

const loginCheck = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(402).json({ message: "Please login " });
  }

  jwt.verify(token, process.env.TOKENSECRETKEY, (err, decodedToken) => {
    if (err) {
      return res.status(402).json({ message: "Please login" });
    }

    req.decodedToken = decodedToken; // Store decoded token in request for later use
    next();
  });
};

module.exports = { userCheck, adminCheck ,loginCheck};
