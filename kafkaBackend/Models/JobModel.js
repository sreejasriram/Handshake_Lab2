const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var companyModel = require('./CompanyModel')
autoIncrement = require('mongoose-auto-increment');

// var company = companyModel.createModel()

const jobSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    id: { type: String, required: false },
    // companyId:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'company' },
    companyId:{ type: mongoose.Schema.Types.ObjectId, required: true},

    title: { type: String, required: true },
    posting_date: { type: String, required: true },
    deadline: { type: String, required: true },
    location: { type: String, required: false },
    salary: { type: String, required: false },
    description: { type: String, required: false },
    category: { type: String, required: false },
    applications: [
        {
            // id: String,
            studentId: mongoose.Schema.Types.ObjectId,
            status: String,
            appliedDate: String,
            resume: String
        }
    ]
}, { _id: false }, { collection: 'jobs' });

// autoIncrement.initialize(mongoose.connection);
// jobSchema.plugin(autoIncrement.plugin, { model: 'jobs', field: 'applications.id',startAt: 1 });
const createModel = function () {
    return mongoose.model("jobs", jobSchema)
}

module.exports.createModel = createModel;