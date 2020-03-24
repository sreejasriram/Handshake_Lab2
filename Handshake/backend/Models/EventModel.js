const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    id: { type: String, required: true },
    companyId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    time: { type: String, required: true },
    date: { type: String, required: false },
    location: { type: String, required: false },
    eligibility: { type: String, required: false },
   
    registrations: [
        {
            id: String,
            studentId: String,
            status: String
        }
    ]
}, { _id: false }, { collection: 'events' });

const createModel = function () {
    return mongoose.model("events", eventSchema)
}

module.exports.createModel = createModel;