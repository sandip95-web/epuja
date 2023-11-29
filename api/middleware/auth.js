const jwt = require("jsonwebtoken");
const User = require("../models/user");



const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(404)
      .json({ success: false, message: "Token doesn't exist" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Token is invalid or expired" });
  }
};

//to check aunthentication
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res
        .status(403)
        .json({ success: false, message: "You are unauthorized to access" });
    } else {
      next();
    }
  };
};



module.exports = { authMiddleware, authorizeRole};
