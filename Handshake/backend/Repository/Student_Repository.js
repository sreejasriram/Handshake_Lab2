var express = require('express');
var router = express.Router();
var app = express();
var connect_sql = require('../Database/database_connect');
var connect_queries = require('../Database/database_queries');
const Student = require('../Models/StudentModel');
const Company = require('../Models/CompanyModel');
const query =require('../Database/queries');


// exports.signup = (stud_details,callback)=>{
exports.student_signup = (stud_details,callback)=>{
    console.log(stud_details)
    try{
        query.saveDocuments(Student.createModel(),stud_details,{runValidators:false}, (err,rows) => {
                    callback(err,rows)
                });
    }
    catch(e)
    {
       callback(e,null)
    }
};


exports.student_signin = (stud_details,callback)=>{
    console.log(stud_details)
    try{
        query.findDocumentsByQuery(Student.createModel(),{email:stud_details.email,password:stud_details.password}, (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};

exports.student_basic_edited = (stud_details,callback)=>{
    console.log(stud_details)
    const update_data = {
        dob: stud_details.dob,
        city: stud_details.city,
        state: stud_details.state,
        country: stud_details.country
    }
    console.log(update_data)
    console.log(stud_details.id)

    try{
        query.updateField(Student.createModel(),{_id:stud_details.id},update_data, (err,rows) => {
                    callback(err,rows)
                });
    }
    catch(e)
    {
       callback(e,null)
    }
};

exports.student_skill_edited = (stud_details,callback)=>{
    console.log(stud_details)
    const update_data = {
        skills: stud_details.skills
    }
    console.log(update_data)
    console.log(stud_details.id)

    try{
        query.updateField(Student.createModel(),{_id:stud_details.id},update_data, (err,rows) => {
                    callback(err,rows)
                });
    }
    catch(e)
    {
       callback(e,null)
    }
};

exports.student_journey_edited= (stud_details,callback)=>{
    console.log(stud_details)
    const update_data = {
        career_objective: stud_details.career_objective
    }
    console.log(update_data)
    console.log(stud_details.id)

    try{
        query.updateField(Student.createModel(),{_id:stud_details.id},update_data, (err,rows) => {
                    callback(err,rows)
                });
    }
    catch(e)
    {
       callback(e,null)
    }
};

exports.student_contact_edited = (stud_details,callback)=>{
    console.log(stud_details)
    const update_data = {
        email: stud_details.email,
        mobile: stud_details.mobile
    }
    console.log(update_data)
    console.log(stud_details.id)

    try{
        query.updateField(Student.createModel(),{_id:stud_details.id},update_data, (err,rows) => {
                    callback(err,rows)
                });
    }
    catch(e)
    {
       callback(e,null)
    }
};

exports.student_profilepic_edited = (stud_details,callback)=>{
    console.log(stud_details)
    const update_data = {
        name: stud_details.name
    }
    console.log(update_data)
    console.log(stud_details.id)

    try{
        query.updateField(Student.createModel(),{_id:stud_details.id},update_data, (err,rows) => {
                    callback(err,rows)
                });
    }
    catch(e)
    {
       callback(e,null)
    }
};


exports.student_profile_info = (stud_details,callback)=>{
    console.log(stud_details)
    try{
        query.findDocumentsByQuery(Student.createModel(),{_id:stud_details.id}, (err,rows) => {
                    callback(err,rows)
                });
    }
    catch(e)
    {
       callback(e,null)
    }
};




exports.basic_retrieve = (student,callback)=>{
    console.log(student)
    try{
        connect_sql.query(connect_queries.student_select_basic,[student.id], (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};
exports.contact_retrieve = (student,callback)=>{
    console.log(student)
    try{
        connect_sql.query(connect_queries.student_select_Contact,[student.id], (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};
exports.skill_retrieve = (student,callback)=>{
    console.log(student)
    try{
        connect_sql.query(connect_queries.student_select_Skill,[student.id], (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};
exports.education_retrieve = (student,callback)=>{
    console.log(student)
    try{
        connect_sql.query(connect_queries.student_select_education,[student.id], (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};
exports.get_student_eligibility = (student,callback)=>{
    console.log(student)
    try{
        connect_sql.query(connect_queries.get_student_eligibility,[student.id,student.event_id,student.cmpy_id], (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};
exports.get_student_profpic = (student,callback)=>{
    console.log(student)
    try{
        connect_sql.query(connect_queries.get_student_profpic,[student.id], (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};

exports.experience_retrieve = (student,callback)=>{
    console.log(student)
    try{
        connect_sql.query(connect_queries.student_select_experience,[student.id], (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};

exports.student_profile = (stud_details,callback)=>{
    try{
        connect_sql.query(connect_queries.student_select_prof,[stud_details.id], (err,rows) => {
            if (rows.length != 0){
                console.log("update prof pic")

                connect_sql.query(connect_queries.student_update_prof,[stud_details.name,
                                                                        stud_details.id], (err,rows) => {
                callback(err,rows)
                });
               
            }  
            else{
                console.log("insert prof pic")

                connect_sql.query(connect_queries.student_insert_prof,[stud_details.id,
                                                                        stud_details.name
                                                                       
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









exports.stud_basic = (stud_details,callback)=>{
    try{
     
        connect_sql.query(connect_queries.student_select_basic,[stud_details.id], (err,rows) => {
            if (rows.length != 0){
                console.log("update basic")

                connect_sql.query(connect_queries.student_update_basic,[
                    // stud_details.name,
                                                                       // stud_details.date,
                                                                        stud_details.date,
                                                                       // STR_TO_DATE(stud_details.date.substring(0,9),'%y-%m-%d'),
                                                                        stud_details.city,
                                                                        stud_details.state,
                                                                        stud_details.country,
                                                                        // stud_details.career_obj,
                                                                        stud_details.id], (err,rows) => {
                callback(err,rows)
                });//name,dob,city,state,country,career_obj
               
            }  
            else{
                console.log("insert basic")

                connect_sql.query(connect_queries.student_insert_basic,[stud_details.id,
                                                                        stud_details.name,
                                                                        stud_details.date,
                                                                        stud_details.city,
                                                                        stud_details.state,
                                                                        stud_details.country,
                                                                        stud_details.career_obj
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

exports.stud_edu = (stud_details,callback)=>{
            try{
        connect_sql.query(connect_queries.student_select_education,[stud_details.id], (err,rows) => {
            if (rows.length != 0){
                console.log("update educ")
                connect_sql.query(connect_queries.student_update_education,[stud_details.clg,
                                                                            stud_details.loc,
                                                                            stud_details.degree,
                                                                            stud_details.major,
                                                                            stud_details.year,
                                                                            stud_details.cgpa,
                                                                            stud_details.id], (err,rows) => {
                    callback(err,rows)
                });
               
            }  
            else{
                console.log("insert edu")

                connect_sql.query(connect_queries.student_insert_education,[stud_details.id,
                                                                            stud_details.clg,
                                                                            stud_details.loc,
                                                                            stud_details.degree,
                                                                            stud_details.major,
                                                                            stud_details.year,
                                                                            stud_details.cgpa
                                                                            
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






exports.stud_experience = (stud_details,callback)=>{
    try{
connect_sql.query(connect_queries.student_select_experience,[stud_details.id], (err,rows) => {
    if (rows.length != 0){
        console.log("update exp")
        connect_sql.query(connect_queries.student_update_experience,[stud_details.cmpy_name,
                                                                    stud_details.title,
                                                                    stud_details.cmpyloc,
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
                                                                    stud_details.cmpyloc,
                                                                    stud_details.start_date,
                                                                    stud_details.end_date,
                                                                    stud_details.work_desc
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
        });
       
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