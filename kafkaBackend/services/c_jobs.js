const query =require('../Database/queries');
const Jobs = require('../Models/JobModel');
const Company = require('../Models/CompanyModel');
var ObjectId = require('mongodb').ObjectID;
const Students = require('../Models/StudentModel');

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

    else  if (cmpny_details.type ===  "apply_job") {
        console.log(cmpny_details)
        if  (!cmpny_details.job_id)
        cmpny_details.job_id='5e994a5c8ceab440c076bf6f'
        console.log(typeof(cmpny_details.job_id))
        const update_data= { $push:{applications:[{
            studentId: ObjectId(cmpny_details.stud_id),
            status: 'Pending',
            appliedDate: cmpny_details.app_date,
            resume: cmpny_details.resume
        }]
    }}
    const update_stud_data= { $push:{applications:[{
         'jobId':ObjectId(cmpny_details.job_id)}]
    
}}
        console.log(update_data)
        try{
                query.updateField(Jobs.createModel(),{_id:ObjectId(cmpny_details.job_id)},update_data,(err,result)=>{
                    console.log("after update")
                if(result){
                    query.updateField(Students.createModel(),{_id:ObjectId(cmpny_details.stud_id)},update_stud_data,(err,result)=>{
                    })
                }
                callback(err,result)
            });
        }
        catch(error){
            return callback(error,null)
        }
}

else  if (cmpny_details.type ===  "list_job_applicants") {
    console.log(cmpny_details.jobId)
    try{
        query.getApplicantsforJob(Jobs.createModel(),'students',{_id:ObjectId(cmpny_details.jobId)},(err,result)=>{

            // query.getProfile(Students.createModel(),{'applications.jobId':ObjectId(cmpny_details.jobId)},(err,result)=>{
            callback(err,result)
        });
    }
    catch(error){
        return callback(error,null)
    }
}
//     else  if (eventDetails.type ===  "apply_event") {
//         console.log(eventDetails)
//         console.log(typeof(eventDetails.event_id))
//         const update_data= { $push:{registrations:[{
//             studentId: ObjectId(eventDetails.stud_id)
//         }]
//     }}
//     const update_stud_data= { $push:{registrations:[{
//          'eventId':ObjectId(eventDetails.event_id)}]
    
// }}
//         console.log(update_data)
//         try{
//                 query.updateField(Events.createModel(),{_id:ObjectId(eventDetails.event_id)},update_data,(err,result)=>{
//                     console.log("after update")
//                 if(result){
//                     query.updateField(Students.createModel(),{_id:ObjectId(eventDetails.stud_id)},update_stud_data,(err,result)=>{
//                     })
//                 }
//                 callback(err,result)
//             });
//         }
//         catch(error){
//             return callback(error,null)
//         }
//     }
   
else  if (cmpny_details.type ===  "list_applied_jobs") {
    console.log(cmpny_details.studentId)
    console.log(typeof(cmpny_details.studentId))
    try{
            query.findDocumentsByLookup(Jobs.createModel(),'companies',{'applications.studentId':ObjectId(cmpny_details.studentId)},(err,result)=>{
            callback(err,result)
        });
    }
    catch(error){
        return callback(error,null)
    }
}
else  if (cmpny_details.type ===  "job_already_applied") {
    console.log(cmpny_details.studentId)
    console.log(cmpny_details.jobId)
    console.log("already job applied")
    try{
        query.getProfile(Jobs.createModel(),{_id:ObjectId(cmpny_details.jobId),'applications.studentId':ObjectId(cmpny_details.studentId)},(err,rows)=>{
            callback(err,rows)
        });
    }
    catch(error){
        return callback(error,null)
    }
}


else  if (cmpny_details.type ===  "update_job_status") {
    console.log(cmpny_details.studentId)
    console.log(cmpny_details.status)
    console.log(cmpny_details.jobId)
    try{
            query.editObj(Jobs.createModel(),{_id:ObjectId(cmpny_details.jobId),'applications.studentId':ObjectId(cmpny_details.studentId)},{'applications.$.status':cmpny_details.status},(err,result)=>{
            callback(err,result)
        });
    }
    catch(error){
        return callback(error,null)
    }
}





}

    


exports.handle_request = handle_request;