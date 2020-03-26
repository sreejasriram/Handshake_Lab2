var express = require('express');
var router = express.Router();
var app = express();
var StudRepo = require('../Repository/Student_Repository');


router.post('/student_signup',(req,res)=>{
    console.log("In student signup post request");
    console.log(req.body);
    StudRepo.student_signup(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)  
            res.json({"error":"failure"})
        }
        else
        res.json({"result":"success"})
    }) 
})

router.get('/student_signin/:email/:password',(req,res)=>{
    console.log("In student signin get request");
    console.log(req.params.email);
    console.log(req.params.password);

    StudRepo.student_signin(req.params,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
           res.status(500).send(err.code+" : "+err.sqlMessage)

        }
        else if(rows)
            {     
            console.log(`student found`)
            console.log(rows)
            res.cookie('student',req.params.email,{maxAge: 90000000, httpOnly: false, path : '/'});
             res.json({"result": rows._id})
        }
        else{
            res.json({"result": "Not found"})

        }        
    }) 
})



router.post('/student_basic_edited',(req,res)=>{
    console.log("In student profile post request");
    console.log(req.body);
    StudRepo.student_basic_edited(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)  
            res.json({"error":"failure"})
        }
        else if(rows){
        console.log(rows)
        res.json({"result":rows})
        }
    })  
})
router.post('/student_skill_edited',(req,res)=>{
    console.log("In student skills post request");
    console.log(req.body);
    StudRepo.student_skill_edited(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)  
            res.json({"error":"failure"})
        }
        else if(rows){
        console.log(rows)
        res.json({"result":rows})
        }
    })  
})

router.post('/student_journey_edited',(req,res)=>{
    console.log("In student journey post request");
    console.log(req.body);
    StudRepo.student_journey_edited(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)  
            res.json({"error":"failure"})
        }
        else if(rows){
        console.log(rows)
        res.json({"result":rows})
        }
    })  
})


router.post('/student_contact_edited',(req,res)=>{
    console.log("In student contact post request");
    console.log(req.body);
    StudRepo.student_contact_edited(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)  
            res.json({"error":"failure"})
        }
        else if(rows){
        console.log(rows)
        res.json({"result":rows})
        }
    })  
})

router.post('/student_profilepic_edited',(req,res)=>{
    console.log("In student profile pic post request");
    console.log(req.body);
    StudRepo.student_profilepic_edited(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)  
            res.json({"error":"failure"})
        }
        else if(rows){
        console.log(rows)
        res.json({"result":rows})
        }
    })  
})


router.get('/student_profile_info/:id',(req,res)=>{
    console.log("In student get profile request");
    console.log(req.params);
    StudRepo.student_profile_info(req.params,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)  
            res.json({"error":"failure"})
        }
        else if(rows){
            console.log("in route")
        console.log(rows)
        res.json({"rows":rows})
        } 
    })  
})



router.post('/get_student_basic',(req,res)=>{
    console.log("In student basic retrieve post request");
    console.log(req.body);
    StudRepo.basic_retrieve(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else{
        console.log(rows)
        res.json({rows})
    }
        
    }) 
})
router.post('/get_student_contact',(req,res)=>{
    console.log("In student contact retrieve post request");
    console.log(req.body);
    StudRepo.contact_retrieve(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else{
        console.log(rows)
        res.json({rows})
    }
        
    }) 
})
router.post('/get_student_skill',(req,res)=>{
    console.log("In student skill retrieve post request");
    console.log(req.body);
    StudRepo.skill_retrieve(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else{
        console.log(rows)
        res.json({rows})
    }
        
    }) 
})
router.post('/get_student_profpic',(req,res)=>{
    console.log("In student get_student_profpic retrieve post request");
    console.log(req.body);
    StudRepo.get_student_profpic(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else{
        console.log(rows)
        res.json({rows})
    }
        
    }) 
})


router.post('/get_student_education',(req,res)=>{
    console.log("In student education retrieve post request");
    console.log(req.body);
    StudRepo.education_retrieve(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else{
        console.log(rows)
        res.json({rows})
    }
        
    }) 
})
router.post('/get_student_eligibility',(req,res)=>{
    console.log("In get_student_eligibility get request");
    console.log(req.body);
    StudRepo.get_student_eligibility(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else{
        console.log(rows)
        res.json({rows})
    }
        
    }) 
})

router.post('/get_student_experience',(req,res)=>{
    console.log("In student experience retrieve post request");
    console.log(req.body);
    StudRepo.experience_retrieve(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else{
        console.log(rows)
        res.json({rows})
    }
        
    }) 
})

router.post('/student_profile',(req,res)=>{
    console.log(req.body);
    if (req.body.type=="basic"){
    StudRepo.stud_basic(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})

        }
        else{
            console.log(rows)
            res.json({rows})
         }
                                        }) 
    }
    else
    if (req.body.type=="education"){
        StudRepo.stud_edu(req.body,(err,rows)=>{
            if (err){
                console.log(`${err.code}:${err.sqlMessage}`)
                res.json({"error":"failure"})
    
            }
            else{
                console.log(rows)
                res.json({rows})
             }
                                            }) 
        }

        else
        if (req.body.type=="experience"){
            StudRepo.stud_experience(req.body,(err,rows)=>{
                if (err){
                    console.log(`${err.code}:${err.sqlMessage}`)
                    res.json({"error":"failure"})
        
                }
                else{
                    console.log(rows)
                    res.json({rows})
                 }
                                                }) 
            }


        else
    if (req.body.type=="contact"){
        console.log("in contact1")
        StudRepo.stud_contact(req.body,(err,rows)=>{
            console.log("in contact2")

            if (err){
                console.log(`${err.code}:${err.sqlMessage}`)
                res.json({"error":"failure"})
    
            }
            else{
                console.log(rows)
                res.json({rows})
             }
                                            }) 
        }
else
        if (req.body.type=="skill"){
            StudRepo.stud_skill(req.body,(err,rows)=>{
                if (err){
                    console.log(`${err.code}:${err.sqlMessage}`)
                    res.json({"error":"failure"})
        
                }
                else{
                    console.log(rows)
                    res.json({rows})
                 }
                                                }) 
            }
            else
            if (req.body.type=="prof_pic"){
                console.log("in prof_pic")
                StudRepo.student_profile(req.body,(err,rows)=>{      
                    if (err){
                        console.log(`${err.code}:${err.sqlMessage}`)
                        res.json({"error":"failure"})
                    }
                    else{
                        console.log(rows)
                        res.json({rows})
                     }
                                                    }) 
                }
        
        

})




module.exports = router
