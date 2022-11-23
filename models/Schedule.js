const mongoose = require('mongoose');
const Schema = mongoose.Schema

let scheduleSchema = new Schema({
    date: Date,
    date_end: Date,
    person: { type: Schema.Types.ObjectId, ref: "Person" },
    situation: { type: Schema.Types.ObjectId, ref: "ScheduleSituation" },
    employee: { type: Schema.Types.ObjectId, ref: "Employee" },
})

module.exports = mongoose.model('Schedule', scheduleSchema)