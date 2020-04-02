const query =require('../Database/queries');
const Jobs = require('../Models/JobModel');
const Company = require('../Models/CompanyModel');
var ObjectId = require('mongodb').ObjectID;

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

    else  if (cmpny_details.type === "retrieve_all_jobs") {
        console.log(cmpny_details)
        try{
            // query.findDocumentsByQuery(Jobs.createModel(),{},(err,result)=>{
                query.findDocumentsByLookup(Jobs.createModel(),'companies',{},(err,result)=>{
                callback(err,result)
            });
        }
        catch(error){
            return callback(error,null)
        }
    }

    else  if (cmpny_details.type ===  "retrieve_job_details_with_id") {
        console.log(cmpny_details)
        console.log(typeof(cmpny_details.jobId))
        try{
            // query.findDocumentsByQuery(Jobs.createModel(),{},(err,result)=>{
                query.findDocumentsByLookup(Jobs.createModel(),'companies',{_id:ObjectId(cmpny_details.jobId)},(err,result)=>{
                callback(err,result)
            });
        }
        catch(error){
            return callback(error,null)
        }
    }
   
}

    


exports.handle_request = handle_request;