const express = require('express');
const router = express.Router();
const Auction = require('./models/auction'); // Adjust path as needed

// GET /api/auctions
router.get('/auctions', async (req, res) => {
    try {
        const auctions = await Auction.find(); // Fetch auctions from the database
        res.json({ auctions });
    } catch (error) {
        console.error('Error fetching auctions:', error);
        res.status(500).json({ message: 'Error fetching auctions' });
    }
});

module.exports = router;
