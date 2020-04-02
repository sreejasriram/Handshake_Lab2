const query =require('../Database/queries');
const Events = require('../Models/EventModel');
const Students = require('../Models/StudentModel');

var ObjectId = require('mongodb').ObjectID;

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
    else  if (eventDetails.type === "retrieve_all_events") {
        console.log(eventDetails)
        try{
            query.findDocumentsByQuery(Events.createModel(),{},(err,result)=>{
                callback(err,result)
            });
        }
        catch(error){
            return callback(error,null)
        }

    }
    else  if (eventDetails.type ===  "retrieve_event_details_with_id") {
        console.log(eventDetails.eventId)
        console.log(typeof(eventDetails.eventId))
        try{
            // query.findDocumentsByQuery(Jobs.createModel(),{},(err,result)=>{
                query.findDocumentsByLookup(Events.createModel(),'companies',{_id:ObjectId(eventDetails.eventId)},(err,result)=>{
                callback(err,result)
            });
        }
        catch(error){
            return callback(error,null)
        }
    }

    else  if (eventDetails.type ===  "apply_event") {
        console.log(eventDetails)
        console.log(typeof(eventDetails.event_id))
        const update_data= { $push:{registrations:[{
            studentId: ObjectId(eventDetails.stud_id)
        }]
    }}
    const update_stud_data= { $push:{registrations:[{
         'eventId':ObjectId(eventDetails.event_id)}]
    
}}
        console.log(update_data)
        try{
                query.updateField(Events.createModel(),{_id:ObjectId(eventDetails.event_id)},update_data,(err,result)=>{
                    console.log("after update")
                if(result){
                    query.updateField(Students.createModel(),{_id:ObjectId(eventDetails.stud_id)},update_stud_data,(err,result)=>{
                    })
                }
                callback(err,result)
            });
        }
        catch(error){
            return callback(error,null)
        }
    }
   

    else  if (eventDetails.type ===  "list_applied_events") {
        console.log(eventDetails.studentId)
        console.log(typeof(eventDetails.studentId))
        try{
                // query.findDocumentsByLookup(Events.createModel(),'companies',{registrations:[{studentId:ObjectId(eventDetails.studentId)}]},(err,result)=>{
                    query.findDocumentsByLookup(Events.createModel(),'companies',{'registrations.studentId':ObjectId(eventDetails.studentId)},(err,result)=>{

                callback(err,result)
            });
        }
        catch(error){
            return callback(error,null)
        }
    }
    
}

exports.handle_request = handle_request;