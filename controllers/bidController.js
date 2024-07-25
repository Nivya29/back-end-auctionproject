const Bid = require('../models/Bid');
const Auction = require('../models/Auction');

const placeBid = async (req, res) => {
    const { auctionId, bidAmount } = req.body;

    try {
        const auction = await Auction.findById(auctionId);
        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }

        if (bidAmount <= auction.currentBid) {
            return res.status(400).json({ message: 'Bid amount must be greater than the current bid' });
        }

        // Update auction with new bid
        auction.currentBid = bidAmount;
        await auction.save();

        // Optionally, create a new Bid record
        const newBid = new Bid({
            auction: auctionId,
            amount: bidAmount,
            user: req.user.id, // Assuming user is authenticated
        });
        await newBid.save();

        res.status(200).json({ message: 'Bid placed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    placeBid
};
