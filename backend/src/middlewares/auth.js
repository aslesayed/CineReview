const argon = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon.argon2id,
  memoryCost: 19 * 1024, // 19 MiB in KiB
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json("Password is required");
  }
  try {
    const hash = await argon.hash(password, hashingOptions);
    req.body.password = hash;
    next();
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies["auth-token"];
    if (!token) {
      return res.status(401).json("Authentication required");
    }
    const decoded = jwt.verify(token, process.env.APP_SECRET);
    req.role = decoded.role;
    req.userID = decoded.id;
    next();
  } catch (error) {
    res.status(401).json(error.message);
  }
};

const isAdmin = async (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json("Admin access required");
  }
  next();
};

module.exports = {
  hashPassword,
  isAuth,
  isAdmin,
};
