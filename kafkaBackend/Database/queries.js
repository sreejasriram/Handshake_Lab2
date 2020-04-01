
const findDocumentsByQuery = (modelObject, query, options,callback) => {
    try {
        modelObject.find(query, options,'_id',(err, data)=>{
            if (data){
                console.log(data)
                callback(err,data)
            }
            else if(err){
                callback(err,data)
            }
        }).lean();
    } catch (error) {
        console.log("Error while saving data:" + error)
        callback(err,null)
    }
}

const saveDocuments = (modelObject, data,options,callback) => {
    try {
        let model = new modelObject(data,options);
        console.log(model)
        model.save(options,(err, data)=>{
            if (data){
                callback(err,data)
            }
            else if(err){
                callback(err,data)
            }
        });
 
    } catch (error) {
        console.log("Error while saving data:" + error)
        callback(err,null)
    }
}

const updateField = async (modelObject, id, update) => {
    try {
        return await modelObject.findOneAndUpdate({ id }, update, { useFindAndModify: false });
    } catch (error) {
        logger.error("Error while updating data:" + error)
        throw new Error(error);
    }
}

module.exports.findDocumentsByQuery = findDocumentsByQuery;
module.exports.saveDocuments = saveDocuments;
module.exports.updateField = updateField;