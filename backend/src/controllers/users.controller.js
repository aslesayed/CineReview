const argon = require("argon2");
const jwt = require("jsonwebtoken");
const userModel = require("../models/users.model");
const { insert } = require("../models/users.model");

const add = async (req, res, next) => {
  try {
    let { firstname, lastname, email, telephone, password } = req.body;
    let thumbnail = req.file ? `${req.protocol}://${req.get("host")}/upload/${req.file.filename}` : '/public/upload/defaultpicture.jpg';

    const user = { firstname, lastname, email, telephone, password, thumbnail };

    // Si aucun fichier n'est téléchargé (req.file n'est pas défini), utiliser l'image par défaut
    if (!req.file && !thumbnail) {
      thumbnail = '/public/upload/defaultpicture.jpg';
    }

    await insert(user);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const [[user]] = await userModel.findByEmail(email);

    if (!user) {
      return res.sendStatus(422); // Utilisateur non trouvé
    }

    if (!user.password.startsWith('$argon2id$')) {
      return res.sendStatus(500); // Format de mot de passe incorrect
    }

    const isPasswordValid = await argon.verify(user.password, password);

    if (isPasswordValid) {
      const token = jwt.sign(
        { id: user.user_id, role: user.admin },
        process.env.APP_SECRET,
        { expiresIn: "30d" }
      );

      res.cookie("auth-token", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 jours en millisecondes
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      });

      return res.status(200).json(user);
    } else {
      return res.sendStatus(422); // Mot de passe invalide
    }
  } catch (error) {
    console.error('Error during login:', error);
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

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id; // Access the id parameter correctly
    const data = req.body; // Assuming you have a body parser middleware handling form-data
    const [result] = await userModel.updateById(id, data); // Call the correct function
    if (result.affectedRows > 0) {
      res.sendStatus(204).json(result); // No content status for successful update
    } else {
      res.sendStatus(404); // Not found status if no rows were affected
    }
  } catch (error) {
    next(error); // Pass errors to the next middleware
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params; // Extract user ID from request parameters
    const [[user]] = await userModel.findById(id); // Find user by ID
    if (user) {
      res.status(200).json(user); // If user exists, send user data
    } else {
      res.sendStatus(404); // If user does not exist, send 404 status
    }
  } catch (error) {
    next(error); // Handle errors by passing to the next middleware
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
  getUserById,
};
