const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(403).json({ message: "Access denied." });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.token_decoded = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
