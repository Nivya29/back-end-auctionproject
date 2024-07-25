const mongoose = require('mongoose');

const AuctionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    currentBid: { type: Number, default: 0 },
    endTime: { type: Date, required: true }, // Add this line
    image: { type: String }, // Add this line if you handle images
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Auction', AuctionSchema);
