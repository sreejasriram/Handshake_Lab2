const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    id: { type: String, required: false },
    companyId:{ type: String, required: true },
    title: { type: String, required: true },
    posting_date: { type: String, required: true },
    deadline: { type: String, required: true },
    location: { type: String, required: false },
    salary: { type: String, required: false },
    description: { type: String, required: false },
    category: { type: String, required: false },
    applications: [
        {
            id: String,
            studentId: String,
            status: String,
            appliedDate: String,
            resume: String
        }
    ]
}, { _id: false }, { collection: 'jobs' });

const createModel = function () {
    return mongoose.model("jobs", jobSchema)
}

module.exports.createModel = createModel;