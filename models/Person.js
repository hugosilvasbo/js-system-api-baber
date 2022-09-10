const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    name: String,
    email: String,
    telephone: String,
    cellphone: String,
    user: String,
    password: String,
    password_reseted: Boolean,
    is_client: Boolean,
    is_employee: Boolean
})

module.exports = Person