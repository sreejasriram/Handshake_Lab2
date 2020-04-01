var express = require('express');
var router = express.Router();
var app = express();
// var connect_sql = require('../Database/database_connect');
// var connect_queries = require('../Database/database_queries');
// const Student = require('../Models/StudentModel');
// const Company = require('../Models/CompanyModel');
const query = require('../Database/queries');

/* ****************Error handling*********************************
app.use(function(err, req, res, next) {
    console.error(err.message); // Log error message in our server's console
    if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
  });


  exports.signup = (stud_details,callback,next)=>{
    
connect_sql.query(connect_queries.student_signup,[stud_details.firstname,stud_details.lastname,stud_details.email,stud_details.pwd,stud_details.college], (err,rows) => {
          if(err){
            next(err)}
        else
            callback(err,rows)
        }); 
};
*/


// exports.company_signup = (cmpny_details,callback)=>{
//     console.log(cmpny_details)
//     try{
//         connect_sql.query(connect_queries.company_signup,[cmpny_details.name,cmpny_details.email,cmpny_details.password,cmpny_details.loc], (err,rows) => {
//             callback(err,rows)
//         });
//     }
//     catch(e)
//     {
//        callback(e,null)
//     }
// };
exports.company_signup = (cmpny_details,callback)=>{
    console.log(cmpny_details)
    try{
        query.saveDocuments(Company.createModel(),cmpny_details,{runValidators:false}, (err,rows) => {
                    callback(err,rows)
                });
    }
    catch(e)
    {
       callback(e,null)
    }
};


exports.company_signin = (cmpny_details,callback)=>{
    console.log(cmpny_details)
    try{
        query.findDocumentsByQuery(Company.createModel(),{email:cmpny_details.email,password:cmpny_details.password}, (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};

// exports.post_job = (job_details,callback)=>{
//     console.log(job_details)
//     try{
//         connect_sql.query(connect_queries.company_jobs,[job_details.id,job_details.title,job_details.postingDate,job_details.deadline,
//             job_details.loc,job_details.salary,job_details.desc,job_details.cat], (err,rows) => {
//             callback(err,rows)
//         });
//     }
//     catch(e)
//     {
//        callback(e,null)
//     }
// };
exports.job_apply = (application,callback)=>{
    console.log(application)
    try{
        connect_sql.query(connect_queries.apply_job,[application.stud_id,application.cmpy_id,application.job_id,"pending",application.app_date,application.resume], (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};
exports.apply_event = (application,callback)=>{
    console.log(application)
    try{
        connect_sql.query(connect_queries.apply_event,[application.stud_id,application.cmpy_id,application.event_id], (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};

exports.job_already_applied = (application,callback)=>{
    console.log(application)
    try{
        connect_sql.query(connect_queries.job_already_applied,[application.stud_id,application.cmpy_id,application.job_id], (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};
exports.event_already_applied = (application,callback)=>{
    console.log(application)
    try{
        connect_sql.query(connect_queries.event_already_applied,[application.stud_id,application.cmpy_id,application.event_id], (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};

exports.list_applied_jobs = (data,callback)=>{
    console.log(data)
    try{
        connect_sql.query(connect_queries.list_applied_jobs,[data.id], (err,rows) => {
         
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};
exports.list_applied_events = (data,callback)=>{
    console.log(data)
    try{
        connect_sql.query(connect_queries.list_applied_events,[data.id], (err,rows) => {
         
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};
exports.updateStudentstatus = (data,callback)=>{
    console.log(data)
    try{
        connect_sql.query(connect_queries.updateStudentstatus,
                        [data.status,data.companyId,data.jobId,data.studentId],
                        (err,rows) => {
            callback(err,rows)
        });
    }
    catch(err)
    {
       callback(err,null)
    }
};

exports.get_student_profile = (data,callback)=>{
    console.log(data)
    try{
        connect_sql.query(connect_queries.get_student_profile,[data.id], (err,rows) => {
            console.log("data");
            console.log(rows);
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};
exports.list_applicants = (data,callback)=>{
    console.log(data)
    try{
        connect_sql.query(connect_queries.list_applicants,[data.id,data.job_id], (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};

exports.list_event_applicants = (data,callback)=>{
    console.log(data)
    try{
        connect_sql.query(connect_queries.list_event_applicants,[data.id,data.event_id], (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};


exports.jobs_retrieve = (company,callback)=>{
    console.log(company)
    try{
        connect_sql.query(connect_queries.company_jobs_posted,[company.id], (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};
exports.all_jobs_retrieve = (callback)=>{
    try{
        connect_sql.query(connect_queries.jobs_available, (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};
exports.list_all_students = (callback)=>{
    try{
        connect_sql.query(connect_queries.list_all_students, (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};

exports.all_events_retrieve = (callback)=>{
    try{
        connect_sql.query(connect_queries.events_available, (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};


exports.jobs_details = (job,callback)=>{
    try{
        connect_sql.query(connect_queries.job_details,[job.id], (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};
exports.events_details = (event,callback)=>{
    try{
        connect_sql.query(connect_queries.events_details,[event.id], (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};


exports.events = (event_details,callback)=>{
    console.log(event_details)
    try{
        connect_sql.query(connect_queries.company_events,[event_details.id,event_details.name,event_details.desc,event_details.time,
            event_details.date,event_details.loc,event_details.elig], (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};//cmpy_id,name,eventDesc,time,date,loc,Elig(SE,CE,CS,all)
exports.save_edited_event = (event_details,callback)=>{
    console.log(event_details)
    try{
        connect_sql.query(connect_queries.save_edited_event,[event_details.name,event_details.desc,event_details.time,
            event_details.date.substring(0,9),event_details.loc,event_details.elig,event_details.id,event_details.event_id], (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};
exports.save_edited_job = (job_details,callback)=>{
    console.log(job_details)
    try{
        connect_sql.query(connect_queries.save_edited_job,[job_details.title,job_details.postingDate,job_details.deadline,
            job_details.loc,job_details.salary,job_details.desc,job_details.cat,job_details.id,job_details.job_id], (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};
exports.edit_job_retrieve = (company,callback)=>{
    console.log(company)
    try{
        connect_sql.query(connect_queries.edit_job_retrieve,[company.id,company.job_id], (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};


exports.events_retrieve = (company,callback)=>{
    console.log(company)
    try{
        connect_sql.query(connect_queries.company_events_posted,[company.id], (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};
exports.edit_event_retrieve = (company,callback)=>{
    console.log(company)
    try{
        connect_sql.query(connect_queries.edit_event_retrieve,[company.id,company.event_id], (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};



exports.profile_retrieve = (company,callback)=>{
    console.log(company)
    try{
        connect_sql.query(connect_queries.company_profile,[company.id], (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};

exports.profile_save = (profile_details,callback)=>{
    console.log(profile_details)
    try{
        connect_sql.query(connect_queries.add_company_profile,[profile_details.name,profile_details.loc,profile_details.desc,
            profile_details.contact,profile_details.id], (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};

//
//              title : this.state.name,
//             postingDate: this.state.email,
//             deadline : this.state.password,
//             loc: this.state.loc,
//             salary: this.state.salary,
//             desc : this.state.desc,
//             cat: this.state.cat,
//             id: cmpny_id

/*
exports.cmpny_basic = (cmpny_details,callback)=>{
    try{
       // console.log(stud_details.type)
        //if (stud_details.type=="basic")
        connect_sql.query(connect_queries.company_select_basic,[cmpny_details.id], (err,rows) => {
            if (rows.length != 0){
                console.log("update basic")

                connect_sql.query(connect_queries.company_update_basic,[cmpny_details.name,
                    cmpny_details.date,
                    cmpny_details.city,
                    cmpny_details.state,
                    cmpny_details.country,
                    cmpny_details.career_obj,
                    cmpny_details.id], (err,rows) => {
                callback(err,rows)
                });//name,dob,city,state,country,career_obj
               
            }  
            else{
                console.log("insert basic")

                connect_sql.query(connect_queries.company_insert_basic,[cmpny_details.id,
                    cmpny_details.name,
                    cmpny_details.date,
                    cmpny_details.city,
                    cmpny_details.state,
                    cmpny_details.country,
                    cmpny_details.career_obj
                                                                        ], (err,rows) => {
                
                callback(err,rows)
                });
                
            }
        });

    }
    catch(e)
    {
       callback(e,null)
    }
};

        //else
       // if (stud_details.type=="education"){
        //console.log("ba")
exports.stud_edu = (cmpny_details,callback)=>{
            try{
        connect_sql.query(connect_queries.company_select_education,[cmpny_details.id], (err,rows) => {
            if (rows.length != 0){
                console.log("update educ")
                connect_sql.query(connect_queries.company_update_education,[cmpny_details.clg,
                    cmpny_details.loc,
                    cmpny_details.degree,
                    cmpny_details.major,
                    cmpny_details.year,
                    cmpny_details.cgpa,
                    cmpny_details.id], (err,rows) => {
                    callback(err,rows)
                });//stud_id,clg,loc,degree,major,year,cgpa
               
            }  
            else{
                console.log("insert edu")

                connect_sql.query(connect_queries.company_insert_education,[cmpny_details.id,
                    cmpny_details.clg,
                    cmpny_details.loc,
                    cmpny_details.degree,
                    cmpny_details.major,
                    cmpny_details.year,
                    cmpny_details.cgpa
                                                                            
                                                                        ], (err,rows) => {
                
                callback(err,rows)
                });
                
            }

            
        });

   // }
    }
    catch(e)
    {
       callback(e,null)
    }
};


*/

/*

exports.stud_experience = (stud_details,callback)=>{
    try{
connect_sql.query(connect_queries.student_select_experience,[stud_details.id], (err,rows) => {
    if (rows.length != 0){
        console.log("update exp")
        connect_sql.query(connect_queries.student_update_experience,[stud_details.cmpy_name,
                                                                    stud_details.title,
                                                                    stud_details.loc,
                                                                    stud_details.start_date,
                                                                    stud_details.end_date,
                                                                    stud_details.work_desc,
                                                                    stud_details.id], (err,rows) => {
            callback(err,rows)
        });//stud_id,cmpy_name,title,loc,start_date,end_date,work_desc
       
    }  
    else{
        console.log("insert exp")

        connect_sql.query(connect_queries.student_insert_experience,[stud_details.id,
                                                                    stud_details.cmpy_name,
                                                                    stud_details.title,
                                                                    stud_details.loc,
                                                                    stud_details.start_date,
                                                                    stud_details.end_date,
                                                                    stud_details.work_desc
                                                                    ], (err,rows) => {
        
        callback(err,rows)
        });
        
    }

    
});

// }



}
catch(e)
{
callback(e,null)
}
};










exports.stud_contact = (stud_details,callback)=>{
    try{
        console.log("in contact3")
connect_sql.query(connect_queries.student_select_Contact,[stud_details.id], (err,rows) => {
    if (rows.length != 0){
        console.log("update contact")
        connect_sql.query(connect_queries.student_update_Contact,[stud_details.phone,
                                                                    stud_details.email,
                                                                    stud_details.id], (err,rows) => {
            callback(err,rows)
        });//stud_id,phone,email
       
    }  
    else{
        console.log("insert contact")

        connect_sql.query(connect_queries.student_insert_Contact,[stud_details.id,
                                                                    stud_details.phone,
                                                                    stud_details.email
                                                                    ], (err,rows) => {
        
        callback(err,rows)
        });
        
    }

    
});

// }



}
catch(e)
{
callback(e,null)
}
};






exports.stud_skill = (stud_details,callback)=>{
    try{
connect_sql.query(connect_queries.student_select_Skill,[stud_details.id], (err,rows) => {
    if (rows.length != 0){
        console.log("update skill")
        connect_sql.query(connect_queries.student_update_Skill,[stud_details.skill,
                                                                    stud_details.id], (err,rows) => {
            callback(err,rows)
        });//stud_id,skill
       
    }  
    else{
        console.log("insert skill")

        connect_sql.query(connect_queries.student_insert_Skill,[stud_details.id,
                                                                    stud_details.skill
                                                                    
                                                                ], (err,rows) => {
        
        callback(err,rows)
        });
        
    }

    
});

// }



}
catch(e)
{
callback(e,null)
}
};
*/