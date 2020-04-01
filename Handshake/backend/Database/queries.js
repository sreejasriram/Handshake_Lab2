
// const findDocumentsByQuery = (modelObject, query, options,callback) => {
//     try {
//         modelObject.findOne(query, options,'_id',(err, data)=>{
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
//         callback(error,null)
//     }
// }

// const saveDocuments = (modelObject, data,options,callback) => {
//     try {
//         let model = new modelObject(data,options);
//         console.log(model)
//         model.save(options,(err, data)=>{
//             if (data){
//                 callback(err,data)
//             }
//             else if(err){
//                 callback(err,data)
//             }
//         });
 
//     } catch (error) {
//         console.log("Error while saving data:" + error)
//         callback(error,null)
//     }
// }


// const updateField = (modelObject, id, update,callback) => {
//     try {
//         modelObject.findOneAndUpdate(id, update, { useFindAndModify: false,new:true },(err, data)=>{
//             if (data){
//                 console.log("success")
//                 console.log(data)
//                 callback(err,data)
//             }
//             else if(err){
//                 callback(err,data)
//             }
//         });
//     } catch (error) {
//         console.log("Error while saving data:" + error)
//         callback(error,null)
//     }
// }

// module.exports.findDocumentsByQuery = findDocumentsByQuery;
// module.exports.saveDocuments = saveDocuments;
// module.exports.updateField = updateField;