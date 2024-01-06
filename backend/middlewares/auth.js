const jwt = require('jsonwebtoken');

const userCheck = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(402).json({ message: "Please login" });
  }
s
  jwt.verify(token, 'Ashish', (err, decodedToken) => {
    if (err) {
      return res.status(402).json({ message: "Please login" });
    }

    req.decodedToken = decodedToken; // Store decoded token in request for later use
    next();
  });
};

const adminCheck = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(402).json({ message: "Please login" });
  }

  jwt.verify(token, 'Ashish', (err, decodedToken) => {
    if (err) {
      return res.status(402).json({ message: "Please login" });
    }

    req.decodedToken = decodedToken; // Store decoded token in request for later use
    next();
  });
};

module.exports = { userCheck, adminCheck };
