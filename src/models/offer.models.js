
const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    offersImage: {type: String, required: true},
    offersImageText: {type: String, required: true},
    injected: {type: String, required: true},
    ribbon: {type: String, required: true},
})

const Offer = mongoose.model('offer', offerSchema);

module.exports = Offer;
