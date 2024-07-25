const express = require('express');
const { placeBid } = require('../controllers/bidController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Apply authentication middleware to the bid route
router.post('/place-bid', authMiddleware, placeBid);

module.exports = router;
