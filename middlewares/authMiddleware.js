const jwt = require("jsonwebtoken");

// Verify JWT Token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(403).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

// Role-based Access Middleware
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "Access restricted to admin" });
  next();
};

const isTeacher = (req, res, next) => {
  if (req.user.role !== "teacher")
    return res.status(403).json({ error: "Access restricted to teachers" });
  next();
};

const isStudent = (req, res, next) => {
  if (req.user.role !== "student")
    return res.status(403).json({ error: "Access restricted to students" });
  next();
};

module.exports = { verifyToken, isAdmin, isTeacher, isStudent };
