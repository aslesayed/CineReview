const argon = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon.argon2id,
  memoryCost: 19 * 2 ** 10, // 19 Mio en kio (19 * 1024 kio)
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  const { password } = req.body;

  try {
    const hash = await argon.hash(password, hashingOptions);
    req.body.password = hash;
    next();
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies["auth-token"];
    console.log("Token received:", token);
    if (!token) {
      return res.status(401).json("Access Denied");
    }
    const decoded = jwt.verify(token, process.env.APP_SECRET);
    console.log("Decoded token:", decoded);
    
    // Assign to req.user for compatibility with deletion logic
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    // Assign to req.admin and req.userID for compatibility with older code
    req.admin = decoded.role;
    req.userID = decoded.id;

    next();
  } catch (error) {
    console.error("Error in isAuth middleware:", error);
    res.status(401).json("Invalid Token");
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (!req.admin) {
      throw new Error("Sorry, you are unauthorized to view this page.");
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json("Sorry, you are unauthorized to view this page.");
  }
};

module.exports = {
  hashPassword,
  isAuth,
  isAdmin,
};
