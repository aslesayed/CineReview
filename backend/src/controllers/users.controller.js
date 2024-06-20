const argon = require("argon2");
const jwt = require("jsonwebtoken");
const userModel = require("../models/users.model");

const add = async (req, res, next) => {
  try {
    const user = req.body;
    user.thumbnail = `${req.protocol}://${req.get("host")}/upload/${
      req.file.filename
    }`;
    const [result] = await userModel.insert(user);
    if (result.insertId) {
      const [[newUser]] = await userModel.findById(result.insertId);
      res.status(201).json(newUser);
    } else {
      res.sendStatus(422);
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const [[user]] = await userModel.findByEmail(email);
    if (!user) res.sendStatus(422);
    else if (await argon.verify(user.password, password)) {
      const token = jwt.sign(
        { id: user.user_id, role: user.admin },
        process.env.APP_SECRET,
        { expiresIn: "30d" }
      );
      res.cookie("auth-token", token, {
        expire: "30d",
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      });
      res.status(200).json(user);
    } else res.sendStatus(422);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const [user] = await userModel.findAll();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const [[user]] = await userModel.findById(req.userID);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("auth-token").sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const deleteuser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await userModel.deleteById(id);
    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

// const updateUse = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const [result] = await userModel.updateById(req.body, id);
//     if (result.affectedRows > 0) res.sendStatus(204);
//     else res.sendStatus(404);
//   } catch (error) {
//     next(error);
//   }
// };
const updateUser = async (req, res, next) => {
  try {
    const id = req.userID;
    const data = req.body;
    const [result] = await userModel.updateById(id, data);
    if (result.affectedRows <= 0) res.sendStatus(422);
    else {
      const [[user]] = await userModel.findById(id);
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  add,
  login,
  getAll,
  getCurrentUser,
  logout,
  updateUser,
  deleteuser,
};
