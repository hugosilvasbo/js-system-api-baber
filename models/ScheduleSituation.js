const mongoose = require('mongoose');
const Schema = mongoose.Schema

let scheduleSituation = new Schema({
    description: String,
    color: String
});

module.exports = mongoose.model("ScheduleSituation", scheduleSituation)