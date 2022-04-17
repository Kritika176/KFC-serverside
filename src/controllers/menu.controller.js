const express = require('express');
const router = express.Router();
const Menu = require('../models/menu.model')

router.get('', async(req, res) => {
    try {
        const menu = await Menu.find().lean().exec();
        return res.send(menu)
    } catch(err) {
        return res.send(err.message)
    }
})

module.exports = router;