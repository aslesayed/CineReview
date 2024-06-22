// const express = require("express");
// const router = express.Router();
// const actorController = require("../controllers/actors.controller");

// router.post("/actors", actorController.addActor);
// router.get("/actors", actorController.getAllActors);
// router.put("/actors/:id", actorController.editActor);
// router.delete("/actors/:id", actorController.deleteActor);
// module.exports = router;



const express = require("express");
const router = express.Router();
const actorController = require("../controllers/actors.controller");

router.post("/actors", actorController.addActor);
router.get('/actors/:id', actorController.getActorById);
router.get("/actors", actorController.getAllActors);
router.put("/actors/:id", actorController.editActor);
router.delete("/actors/:id", actorController.deleteActor);
module.exports = router;
