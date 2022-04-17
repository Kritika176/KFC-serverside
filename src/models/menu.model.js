const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    image: {type: String, required: true},
    header: {type: String, required: true},
    menuImg: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: String, required: true},
    description: {type: String, required: true},
    button: {type: String, required: true},
    cartImg: {type: String, required: true}
})

const Menu = mongoose.model('menu', menuSchema);

module.exports = Menu;


