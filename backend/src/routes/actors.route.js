const express = require("express");
const router = express.Router();
const actorController = require("../controllers/actors.controller");

router.post("/", actorController.addActor);

router.get("/", actorController.getAllActors);

router.put("/:id", actorController.editActor);

router.delete("/:id", actorController.deleteActor);

module.exports = router;
