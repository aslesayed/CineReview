const router = require("express").Router();
const userController = require("../controllers/users.controller");
const auth = require("../middlewares/auth");

router.post("/users", auth.hashPassword, userController.add);
router.post("/users/login", userController.login);
router.get("/users/me", auth.isAuth, userController.getCurrentUser);
router.get("/users/logout", auth.isAuth, userController.logout);
router.get("/users", auth.isAuth, auth.isAdmin, userController.getAll);
router.put("/users", auth.isAuth, userController.updateUser);
router.delete("/users/:id", auth.isAuth, auth.isAdmin, userController.deleteUser);

module.exports = router;
