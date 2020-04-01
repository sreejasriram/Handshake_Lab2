const query =require('../Database/queries');
const Events = require('../Models/EventModel');

handle_request=(eventDetails, callback)=>{
    if (eventDetails.type === "add") {

        console.log(eventDetails)
        try{
            query.saveDocuments(Events.createModel(),eventDetails,{runValidators:false},(err,result)=>{
                callback(err,result)
            });
        }
        catch(error){
            return callback(error,null)
        }
    }
    else  if (eventDetails.type === "retrieve") {
        console.log(eventDetails)
        try{
            query.findDocumentsByQuery(Events.createModel(),{companyId:eventDetails.companyId},(err,result)=>{
                callback(err,result)
            });
        }
        catch(error){
            return callback(error,null)
        }

    }
}

exports.handle_request = handle_request;