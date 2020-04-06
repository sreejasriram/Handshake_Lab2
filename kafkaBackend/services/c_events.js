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
    else  if (eventDetails.type ===  "list_event_applicants") {
        console.log(eventDetails.eventId)
        try{
                query.getProfile(Students.createModel(),{'registrations.eventId':ObjectId(eventDetails.eventId)},(err,result)=>{
                callback(err,result)
            });
        }
        catch(error){
            return callback(error,null)
        }
    }

    else  if (eventDetails.type ===  "list_event_applicants_profile") {
        console.log(eventDetails.studentId)
        try{
                query.getProfile(Students.createModel(),{_id:ObjectId(eventDetails.studentId)},(err,result)=>{
                callback(err,result)
            });
        }
        catch(error){
            return callback(error,null)
        }
    }
    

    else  if (eventDetails.type ===  "event_already_applied") {
        console.log(eventDetails.studentId)
        console.log(eventDetails.eventId)
        console.log("already event applied")
        try{
            query.getProfile(Events.createModel(),{_id:ObjectId(eventDetails.eventId),'registrations.studentId':ObjectId(eventDetails.studentId)},(err,rows)=>{
                callback(err,rows)
            });
        }
        catch(error){
            return callback(error,null)
        }
    }

    else  if (eventDetails.type ===  "check_student_eligibility") {
        console.log(eventDetails.studentId)
        console.log(eventDetails.eventId)
        console.log("check_student_eligibility")
        try{
            query.getProfile(Students.createModel(),{_id:ObjectId(eventDetails.studentId)},(err,rows)=>{
            // query.getProfile(Events.createModel(),{_id:ObjectId(eventDetails.eventId),'registrations.studentId':ObjectId(eventDetails.studentId)},(err,rows)=>{
                callback(err,rows)
            });
        }
        catch(error){
            return callback(error,null)
        }
    }

    
    
    
}

exports.handle_request = handle_request;