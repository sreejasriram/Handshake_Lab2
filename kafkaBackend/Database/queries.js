const Company = require('../Models/CompanyModel');

var comp = Company.createModel()
const updateField =  (modelObject, id, update, callback) => {
    console.log("update")
    console.log(id)
    try {
        modelObject.findOneAndUpdate(id, update, {useFindAndModify:false,new:true}, (err, data) => {
            if (data) {
                console.log(data)
                callback(err, data)
            }
            else if (err) {
                console.log(err)
                callback(err, data)
            }
        });
    } catch (error) {
        console.log("Error while saving data:" + error)
        callback(err, null)
    }
}
const editObj =  (modelObject, id, update, callback) => {
    console.log("update")
    try {
        modelObject.findOneAndUpdate(id, update, {useFindAndModify:false,new:true}, (err, data) => {
            if (data) {
                console.log(data)
                callback(err, data)
            }
            else if (err) {
                console.log(err)
                callback(err, data)
            }
        });
    } catch (error) {
        console.log("Error while saving data:" + error)
        callback(err, null)
    }
}

const findDocumentsByQuery = (modelObject, query, options, callback) => {
    try {
        modelObject.find(query, options, '_id', (err, data) => {
            if (data) {
                console.log(data)
                callback(err, data)
            }
            else if (err) {
                callback(err, data)
            }
        }).lean();
    } catch (error) {
        console.log("Error while saving data:" + error)
        callback(err, null)
    }
}

const getProfile = (modelObject, query, callback) => {
    try {
        modelObject.find(query, (err, data) => {
            if (data) {
                console.log(data)
                callback(err, data)
            }
            else if (err) {
                callback(err, data)
            }
        }).lean();
    } catch (error) {
        console.log("Error while saving data:" + error)
        callback(err, null)
    }
}

// const findDocumentsByPopulate = (modelObject, query, options,callback) => {
//     try {
//         modelObject.find(query, options,'_id',(err, data)=>{
//             if (data){
//                 console.log(data)
//                 callback(err,data)
//             }
//             else if(err){
//                 callback(err,data)
//             }
//         }).lean();
//     } catch (error) {
//         console.log("Error while saving data:" + error)
//         callback(err,null)
//     }
// }


// function getUserWithPosts(username){
//     return User.findOne({ username: username })
//       .populate('posts').exec((err, posts) => {
//         console.log("Populated User " + posts);
//       })
//   }

const findDocumentsByLookup = (modelObject,lookupObject, query, callback) => {
    try {
        console.log(query)

        const agg = [
            { $match: query },
            {
                $lookup:
                {
                    from: lookupObject,
                    localField: 'companyId',
                    foreignField: '_id',
                    as: 'companydetails'
                },
            },

        ];
        modelObject.aggregate(agg).exec((err, data) => {
            if (data) {
                console.log(data)
                callback(err, data)
            }
            else if (err) {
                callback(err, data)
            }
        });


    } catch (error) {
        console.log("Error while saving data:" + error)
        callback(err, null)
    }
}




const getApplicantsforJob = (modelObject,lookupObject, query, callback) => {
    try {
        console.log(query)

        const agg = [
            { $match: query },
            {
                $lookup:
                {
                    from: lookupObject,
                    localField: '_id',
                    foreignField: 'applications.jobId',
                    as: 'listApplicants'
                },
            },

        ];
        modelObject.aggregate(agg).exec((err, data) => {
            if (data) {
                console.log(data)
                callback(err, data)
            }
            else if (err) {
                callback(err, data)
            }
        });


    } catch (error) {
        console.log("Error while saving data:" + error)
        callback(err, null)
    }
}




// const listApplicants = (modelObject,lookupObject, query, callback) => {
//     try {
//         console.log("in lookup")

//         const agg = [
//             { $match: query },
//             {
//                 $lookup:
//                 {
//                     from: lookupObject,
//                     localField: 'companyId',
//                     foreignField: '_id',
//                     as: 'companydetails'
//                 },
//             },

//         ];
//         modelObject.aggregate(agg).exec((err, data) => {
//             if (data) {
//                 console.log(data)
//                 callback(err, data)
//             }
//             else if (err) {
//                 callback(err, data)
//             }
//         });


//     } catch (error) {
//         console.log("Error while saving data:" + error)
//         callback(err, null)
//     }
// }





const saveDocuments = (modelObject, data, options, callback) => {
    try {
        let model = new modelObject(data, options);
        console.log(model)
        model.save(options, (err, data) => {
            if (data) {
                callback(err, data)
            }
            else if (err) {
                callback(err, data)
            }
        });

    } catch (error) {
        console.log("Error while saving data:" + error)
        callback(err, null)
    }
}




module.exports.findDocumentsByQuery = findDocumentsByQuery;
module.exports.saveDocuments = saveDocuments;
module.exports.updateField = updateField;
module.exports.findDocumentsByLookup = findDocumentsByLookup;
module.exports.editObj = editObj;
module.exports.getApplicantsforJob = getApplicantsforJob;

module.exports.getProfile = getProfile;
