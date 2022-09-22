const mongoose = require('mongoose');
const Schema = mongoose.Schema

let scheduleSchema = new Schema({
    date: Date,
    person: { type: Schema.Types.ObjectId, ref: "Person" }
})

module.exports = mongoose.model('Schedule', scheduleSchema)