const query =require('../Database/queries');
const Jobs = require('../Models/JobModel');

handle_request=(cmpny_details, callback)=>{

    if (cmpny_details.type === "add") {
        console.log(cmpny_details)
        try{
            query.saveDocuments(Jobs.createModel(),cmpny_details,{runValidators:false},(err,result)=>{
                callback(err,result)
            });
        }
        catch(error){
            return callback(error,null)
        }
    }

    else  if (cmpny_details.type === "retrieve") {
        console.log(cmpny_details)
        try{
            query.findDocumentsByQuery(Jobs.createModel(),{companyId:cmpny_details.companyId},(err,result)=>{
                callback(err,result)
            });
        }
        catch(error){
            return callback(error,null)
        }

    }
}

    


exports.handle_request = handle_request;