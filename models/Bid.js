const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
    auction: { type: mongoose.Schema.Types.ObjectId, ref: 'Auction', required: true },
    amount: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Bid', BidSchema);
