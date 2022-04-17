
const express = require('express');
const router = express.Router();
const Offer = require('../models/offer.models')

router.get('', async(req, res) => {
    try {
        const offer = await Offer.find().lean().exec();
        return res.send(offer)
    } catch(err) {
        return res.send(err.message)
    }
})

module.exports = router;