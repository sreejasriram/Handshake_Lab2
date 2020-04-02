const mongoose = require('mongoose');
const Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');



const eventSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    id: { type: mongoose.Schema.Types.ObjectId, required: false },

    companyId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    time: { type: String, required: true },
    date: { type: String, required: false },
    location: { type: String, required: false },
    eligibility: { type: String, required: false },
   
    registrations: [
        {
            // id: Number,
            studentId: mongoose.Schema.Types.ObjectId,
            status: String
        }
    ]
}, { _id: false }, { collection: 'events' });
// autoIncrement.initialize(mongoose.connection);
// eventSchema.plugin(autoIncrement.plugin, { model: 'events', field: 'registrations.id'});

const createModel = function () {
    return mongoose.model("events", eventSchema)
}

module.exports.createModel = createModel;