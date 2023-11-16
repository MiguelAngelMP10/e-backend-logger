const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(400).json({ message: "Access denied. No token provided." });
    }

    const tokenSinBearer = token.replace(/^Bearer\s+/i, "");

    if (!tokenSinBearer) {
      return res.status(403).json({ message: "Access denied. Invalid token format." });
    }

    const decoded = jwt.verify(tokenSinBearer, process.env.SECRET_KEY);
    req.token_decoded = decoded;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Access denied. Invalid token." });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};
