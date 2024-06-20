const router = require("express").Router();

const userController = require("../controllers/users.controller");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const { add } = require("../controllers/users.controller");

router.post("/users", upload.single("thumbnail"), add);

router.post("/users/login", userController.login);
router.get(
  "/users/me",
  auth.isAuth,
  auth.isAdmin,
  userController.getCurrentUser
);
router.get("/users/logout", auth.isAuth, userController.logout);
router.get("/users", userController.getAll);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", auth.isAuth, userController.deleteuser);
module.exports = router;
