const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
    description: String,
    price: Number,
    active: Boolean,
    restricted: Boolean,
    type: String // type: product ... service
})

module.exports = Product