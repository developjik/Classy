const mongoose = require('mongoose');
const Schema = mongoose.Schema

const imageSchema = mongoose.Schema({
    path: {
        type: String
    }
}, { timestamps: true })

const Image = mongoose.model('Image', imageSchema);

module.exports = { Image }