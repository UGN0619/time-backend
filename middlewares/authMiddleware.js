const jwt = require("jsonwebtoken");

// Verify JWT Token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decoded; // Attach decoded user data to the request
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Token expired. Please log in again." });
    }
    res.status(400).json({ error: "Invalid token" });
  }
};

// Role-based Access Middleware (Refactored)
const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res
        .status(403)
        .json({ error: `Access restricted to ${role}s only.` });
    }
    next();
  };
};

const isAdmin = checkRole("admin");
const isTeacher = checkRole("teacher");
const isStudent = checkRole("student");

module.exports = { verifyToken, isAdmin, isTeacher, isStudent };
