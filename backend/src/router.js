

const express = require('express');
const contentRoutes = require('./routes/contents.route'); 

const router = express.Router();

// Include content routes
router.use(contentRoutes);

module.exports = router;
