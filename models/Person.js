const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var personSchema = new Schema({
    name: String,
    email: String,
    telephone: String,
    cellphone: String,
    user: String,
    password: String,
    password_reseted: Boolean
})

module.exports = mongoose.model('Person', personSchema)