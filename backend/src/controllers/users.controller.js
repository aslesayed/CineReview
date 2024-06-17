const argon = require("argon2");
const jwt = require("jsonwebtoken");
const userModel = require("../models/users.model");

const add = async (req, res, next) => {
  try {
    const user = req.body;
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
    if (!user) {
      return res.sendStatus(422);
    }
    const validPassword = await argon.verify(user.password, password);
    if (validPassword) {
      const token = jwt.sign(
        { id: user.user_id, role: user.role },
        process.env.APP_SECRET,
        { expiresIn: "30d" }
      );
      res.cookie("auth-token", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      });
      res.status(200).json(user);
    } else {
      res.sendStatus(422);
    }
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const [users] = await userModel.findAll();
    res.status(200).json(users);
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

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await userModel.deleteById(id);
    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.userID;
    const data = req.body;
    const [result] = await userModel.update(id, data);
    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
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
  deleteUser,
};
