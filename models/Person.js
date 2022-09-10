const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    name: String,
    user: String,
    password_reseted: Boolean,
    password: String
})

module.exports = Person