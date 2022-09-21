const mongoose = require('mongoose')

const Employee = mongoose.model('Employee', {
    name: String,
    active: Boolean
})

module.exports = Employee