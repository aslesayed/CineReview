const express = require('express');
const router = express.Router();
const contentsActorsController = require('../controllers/contents_actors.controller'); 


router.post('/contents-actors', contentsActorsController.addContentActor);


router.get('/contents-actors', contentsActorsController.getAllContentActor);

router.get('/contents/:contentId/actors', contentsActorsController.getContentActorById);


router.delete('/contents/:contentId/actors/:actorId', contentsActorsController.deleteContentActor);

router.delete('/contents-actors', contentsActorsController.deleteAllContentActor);

module.exports = router;
