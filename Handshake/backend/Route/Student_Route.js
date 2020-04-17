var express = require('express');
var router = express.Router();
var app = express();
var StudRepo = require('../Repository/Student_Repository');
var kafka = require('../kafka/client');
var multer  = require('multer')
var path = require('path');
const { checkAuth } = require("../utils/passport");
const jwt = require('jsonwebtoken');
var { secret } = require("../utils/config");
const { studauth } = require("../utils/passport");
///////////////////////
const fs = require('fs');
	const AWS = require('aws-sdk');
	const s3 = new AWS.S3({
	    accessKeyId:
	        "AKIAIIQC7PV4X6Z66WNA",
	    secretAccessKey:
	        "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"
	})
	var storage = multer.diskStorage({
	    destination: (req, file, cb) => {
	        if (file.mimetype === "application/pdf") {
	            cb(null, './public/applications')
	        } else {
	            cb(null, './public/images')
	        }
	    },
	    filename: (req, file, cb) => {
	        if (file.mimetype === "application/pdf") {
	           
	            cb(null, req.body.job_id + req.body.studentId + path.extname(file.originalname))
	        } else {
	

	            cb(null,  req.body.studentId + path.extname(file.originalname))
	        }
	    }
	});
	const upload = multer({
	    storage
	})



///////////////////////////

// router.post('/student_signup',(req,res)=>{
//     console.log("In student signup post request");
//     console.log(req.body);
//     StudRepo.student_signup(req.body,(err,rows)=>{
//         if (err){
//             console.log(`${err.code}:${err.sqlMessage}`)  
//             res.json({"error":"failure"})
//         }
//         else
//         res.json({"result":"success"})
//     }) 
// })
router.post('/student_signup',(req,res)=>{
    console.log("In student signup post request");
    console.log(req.body);
    kafka.make_request('login-signup',req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
           
            res.json({"error":"failure"})
        }
        else{
        console.log(rows)
        res.json({"result":"success"})
        }
    }) 
})
// router.get('/student_signin/:email/:password',(req,res)=>{
//     console.log("In student signin get request");
//     console.log(req.params.email);
//     console.log(req.params.password);

//     StudRepo.student_signin(req.params,(err,rows)=>{
//         if (err){
//             console.log(`${err.code}:${err.sqlMessage}`)
//            res.status(500).send(err.code+" : "+err.sqlMessage)

//         }
//         else if(rows)
//             {     
//             console.log(`student found`)
//             console.log(rows)
//             res.cookie('student',req.params.email,{maxAge: 90000000, httpOnly: false, path : '/'});
//              res.json({"result": rows._id})
//         }
//         else{
//             res.json({"result": "Not found"})

//         }        
//     }) 
// })


router.get('/student_signin/:email/:password',(req,res)=>{
    studauth();
    console.log("In student signin get request");
    console.log(req.params.email);
    console.log(req.params.password);
    let msg=req.params;
    kafka.make_request('signup-login',msg,function(err,rows){
    // StudRepo.student_signin(req.params,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
           res.status(500).send(err.code+" : "+err.sqlMessage)
 
        }
        else if(rows.length)
            {     
            console.log(`student found`)
            console.log(rows)
            const payload = { _id: rows[0]._id, username: req.params.email};
            console.log(rows[0]._id)
            console.log(req.params.email)

            const token = jwt.sign(payload, secret, {
                expiresIn: 1008000
            });
            res.cookie('student',req.params.email,{maxAge: 90000000, httpOnly: false, path : '/'});
            console.log("token is")
            console.log(token)
            // res.json({"result": rows[0]._id})
            res.json({"result":"JWT " +token})

        }
        else{
            res.json({"result": "Not found"})

        }        
    }) 
})


router.get('/student_profile_info/:id',checkAuth,(req,res)=>{
    console.log("In student get complete profile request");
    console.log(req.params);
    // StudRepo.student_profile_info(req.params,(err,rows)=>{
        req.body.type = "retrieve_student_profile";
        req.body.studentId = req.params.id;
        // kafka.make_request('profile',req.body,(err,rows)=>{
            kafka.make_request('testTopic',req.body,(err,rows)=>{

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


router.post('/student_basic_edited',checkAuth,(req,res)=>{
    console.log("In student basic post request");
    console.log(req.body);
    req.body.type = "add_basic";
    // StudRepo.student_basic_edited(req.body,(err,rows)=>{
    // kafka.make_request('profile',req.body,(err,rows)=>{
        kafka.make_request('testTopic',req.body,(err,rows)=>{

        

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


router.post('/student_education_edited',checkAuth,(req,res)=>{
    console.log("In student education post request");
    console.log(req.body);
    req.body.type = "add_education";
    // StudRepo.student_basic_edited(req.body,(err,rows)=>{
    // kafka.make_request('profile',req.body,(err,rows)=>{
        kafka.make_request('testTopic',req.body,(err,rows)=>{


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


router.post('/student_experience_edited',checkAuth,(req,res)=>{
    console.log("In student experience post request");
    console.log(req.body);
    req.body.type = "add_experience";
    // kafka.make_request('profile',req.body,(err,rows)=>{
        kafka.make_request('testTopic',req.body,(err,rows)=>{

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

router.post('/student_skill_edited',checkAuth,(req,res)=>{
    console.log("In student skills post request");
    console.log(req.body);
    req.body.type = "add_skill";
    // kafka.make_request('profile',req.body,(err,rows)=>{
        kafka.make_request('testTopic',req.body,(err,rows)=>{


    // StudRepo.student_skill_edited(req.body,(err,rows)=>{
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



router.post('/student_journey_edited',checkAuth,(req,res)=>{
    // router.post('/student_journey_edited',(req,res)=>{

    console.log("In student journey post request");
    console.log(req.body);
    req.body.type = "add_journey";
    // kafka.make_request('profile',req.body,(err,rows)=>{
        kafka.make_request('testTopic',req.body,(err,rows)=>{


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


router.post('/student_contact_edited',checkAuth,(req,res)=>{
    console.log("In student contact post request");
    console.log(req.body);
    req.body.type = "add_contact";
    // kafka.make_request('profile',req.body,(err,rows)=>{
        kafka.make_request('testTopic',req.body,(err,rows)=>{


    // StudRepo.student_contact_edited(req.body,(err,rows)=>{
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

router.post('/student_profilepic_edited',checkAuth,(req,res)=>{
    console.log("In student profile pic post request");
    console.log(req.body);
    req.body.type = "add_profilepic";
    // kafka.make_request('profile',req.body,(err,rows)=>{
        kafka.make_request('testTopic',req.body,(err,rows)=>{


    // StudRepo.student_profilepic_edited(req.body,(err,rows)=>{
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






// router.post('/get_student_basic',(req,res)=>{
//     console.log("In student basic retrieve post request");
//     console.log(req.body);
//     StudRepo.basic_retrieve(req.body,(err,rows)=>{
//         if (err){
//             console.log(`${err.code}:${err.sqlMessage}`)
//             res.json({"error":"failure"})
//         }
//         else{
//         console.log(rows)
//         res.json({rows})
//     }
        
//     }) 
// })
// router.post('/get_student_contact',(req,res)=>{
//     console.log("In student contact retrieve post request");
//     console.log(req.body);
//     StudRepo.contact_retrieve(req.body,(err,rows)=>{
//         if (err){
//             console.log(`${err.code}:${err.sqlMessage}`)
//             res.json({"error":"failure"})
//         }
//         else{
//         console.log(rows)
//         res.json({rows})
//     }
        
//     }) 
// })
// router.post('/get_student_skill',(req,res)=>{
//     console.log("In student skill retrieve post request");
//     console.log(req.body);
//     StudRepo.skill_retrieve(req.body,(err,rows)=>{
//         if (err){
//             console.log(`${err.code}:${err.sqlMessage}`)
//             res.json({"error":"failure"})
//         }
//         else{
//         console.log(rows)
//         res.json({rows})
//     }
        
//     }) 
// })
// router.post('/get_student_profpic',(req,res)=>{
//     console.log("In student get_student_profpic retrieve post request");
//     console.log(req.body);
//     StudRepo.get_student_profpic(req.body,(err,rows)=>{
//         if (err){
//             console.log(`${err.code}:${err.sqlMessage}`)
//             res.json({"error":"failure"})
//         }
//         else{
//         console.log(rows)
//         res.json({rows})
//     }
        
//     }) 
// })


// router.post('/get_student_education',(req,res)=>{
//     console.log("In student education retrieve post request");
//     console.log(req.body);
//     StudRepo.education_retrieve(req.body,(err,rows)=>{
//         if (err){
//             console.log(`${err.code}:${err.sqlMessage}`)
//             res.json({"error":"failure"})
//         }
//         else{
//         console.log(rows)
//         res.json({rows})
//     }
        
//     }) 
// })


// router.post('/get_student_experience',(req,res)=>{
//     console.log("In student experience retrieve post request");
//     console.log(req.body);
//     StudRepo.experience_retrieve(req.body,(err,rows)=>{
//         if (err){
//             console.log(`${err.code}:${err.sqlMessage}`)
//             res.json({"error":"failure"})
//         }
//         else{
//         console.log(rows)
//         res.json({rows})
//     }
        
//     }) 
// })

// router.post('/student_profile',(req,res)=>{
//     console.log(req.body);
//     if (req.body.type=="basic"){
//     StudRepo.stud_basic(req.body,(err,rows)=>{
//         if (err){
//             console.log(`${err.code}:${err.sqlMessage}`)
//             res.json({"error":"failure"})

//         }
//         else{
//             console.log(rows)
//             res.json({rows})
//          }
//                                         }) 
//     }
//     else
//     if (req.body.type=="education"){
//         StudRepo.stud_edu(req.body,(err,rows)=>{
//             if (err){
//                 console.log(`${err.code}:${err.sqlMessage}`)
//                 res.json({"error":"failure"})
    
//             }
//             else{
//                 console.log(rows)
//                 res.json({rows})
//              }
//                                             }) 
//         }

//         else
//         if (req.body.type=="experience"){
//             StudRepo.stud_experience(req.body,(err,rows)=>{
//                 if (err){
//                     console.log(`${err.code}:${err.sqlMessage}`)
//                     res.json({"error":"failure"})
        
//                 }
//                 else{
//                     console.log(rows)
//                     res.json({rows})
//                  }
//                                                 }) 
//             }


//         else
//     if (req.body.type=="contact"){
//         console.log("in contact1")
//         StudRepo.stud_contact(req.body,(err,rows)=>{
//             console.log("in contact2")

//             if (err){
//                 console.log(`${err.code}:${err.sqlMessage}`)
//                 res.json({"error":"failure"})
    
//             }
//             else{
//                 console.log(rows)
//                 res.json({rows})
//              }
//                                             }) 
//         }
// else
//         if (req.body.type=="skill"){
//             StudRepo.stud_skill(req.body,(err,rows)=>{
//                 if (err){
//                     console.log(`${err.code}:${err.sqlMessage}`)
//                     res.json({"error":"failure"})
        
//                 }
//                 else{
//                     console.log(rows)
//                     res.json({rows})
//                  }
//                                                 }) 
//             }
//             else
//             if (req.body.type=="prof_pic"){
//                 console.log("in prof_pic")
//                 StudRepo.student_profile(req.body,(err,rows)=>{      
//                     if (err){
//                         console.log(`${err.code}:${err.sqlMessage}`)
//                         res.json({"error":"failure"})
//                     }
//                     else{
//                         console.log(rows)
//                         res.json({rows})
//                      }
//                                                     }) 
//                 }
        
        

// })


router.get('/all_events_retrieve',checkAuth,(req,res)=>{
    console.log("In student all events retrieve get request");
    req.body.type = "retrieve_all_events";
    kafka.make_request('company-events',req.body,(err,rows)=>{
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

router.get('/all_jobs_retrieve',checkAuth,(req,res)=>{
    console.log("In company all jobs retrieve get request");
    req.body.type = "retrieve_all_jobs";
    kafka.make_request('company-jobs',req.body,(err,rows)=>{
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

router.get('/jobs_details/:jobId',checkAuth,(req,res)=>{
    console.log("In company jobs retrieve post request");
    console.log(req.params)
    req.body.type = "retrieve_job_details_with_id";
    req.body.jobId = req.params.jobId;
    kafka.make_request('company-jobs',req.body,(err,rows)=>{
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

router.get('/events_details/:eventId',checkAuth,(req,res)=>{
    console.log("In event details by id retrieve get request");
    console.log(req.params)
    req.body.type = "retrieve_event_details_with_id";
    req.body.eventId = req.params.eventId;
    kafka.make_request('company-events',req.body,(err,rows)=>{
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


router.post('/apply_event',checkAuth,(req,res)=>{
    console.log("In company apply event post request");
    console.log(req.body);
    req.body.type = "apply_event";

    kafka.make_request('company-events',req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else
        res.json({"result":"success"})
    }) 
})

router.get('/list_applied_events/:studentId',checkAuth,(req,res)=>{
    console.log("In company list_applied_events get request");
    console.log(req.params)
    req.body.type = "list_applied_events";
    req.body.studentId = req.params.studentId;
    kafka.make_request('company-events',req.body,(err,rows)=>{
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

router.get('/list_applied_jobs/:studentId',checkAuth,(req,res)=>{
    console.log("In company list list_applied_jobs get request");
    console.log(req.params)
    req.body.type = "list_applied_jobs";
    req.body.studentId = req.params.studentId;
    kafka.make_request('company-jobs',req.body,(err,rows)=>{
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






router.post('/uploadpic',checkAuth, upload.single('image'), async (req, response) => {
    try {
      if (req.file) {
        const fileContent = fs.readFileSync(`./public/images/${req.body.studentId}${path.extname(req.file.originalname)}`);
        console.log(fileContent)
        console.log(req.body)
        console.log(req.body.studentId);
        const params = {
            Bucket: 'handshakesreeja',
            Key: req.body.studentId + path.extname(req.file.originalname),
            Body: fileContent,
            ContentType: req.file.mimetype
        };

      
        s3.upload(params, function (err, data) {
            if (err) {
                console.log(err.message)
                return response.status(500).json({ "error": err.message })
            }
            console.log(data);
            let profilepic = {
                ...req.body,
                image: data.Location
            }
            profilepic.type = 'studentprofilepic'
            console.log(profilepic)
            // kafka.make_request('profile',profilepic, (err,result) => {
                kafka.make_request('testTopic',profilepic, (err,result) => {

                console.log('in result');
                console.log(result);
                if (err){
                    console.log("Inside err");
                    response.json({'error':err})
                }else if(result.error){
                    response.json({'error':result.error})
                }else{
                    console.log("Inside result");
                        console.log(result)
                        response.json(result);
                    }
            });
       
    });
      }
    } catch (ex) {
      const message = ex.message ? ex.message : 'Error while uploading image';
      console.log(ex)
      const code = ex.statusCode ? ex.statusCode : 500;
      return response.status(code).json({ message });
    }
  });



  /////////////////////////////
  
///////////////#################///////////////////////
// router.get('/get_student_profile/:studentId',checkAuth,(req,res)=>{
//     console.log("In get_student_profile get request");
//     console.log(req.params);
//     req.body.type = "list_event_applicants_profile";
//     req.body.studentId = req.params.studentId;

//     kafka.make_request('company-events',req.body,(err,rows)=>{
//         if (err){
//             console.log(`${err.code}:${err.sqlMessage}`)
//             res.json({"error":"failure"})
//         }
//         else{
//         console.log(rows)
//         res.json({rows})}
        
//     }) 
// })


///////////////#################///////////////////////
// router.get('/list_all_students',checkAuth,(req,res)=>{
//     console.log("In list_all_students from company retrieve post request");
//     req.body.type = "list_all_students_company";
//     kafka.make_request('profile',req.body,(err,rows)=>{
//         if (err){
//             console.log(`${err.code}:${err.sqlMessage}`)
//             res.json({"error":"failure"})
//         }
//         else{
//         console.log(rows)
//         res.json({rows})
//     }
        
//     }) 
// })

///////////////#################///////////////////////
// router.post('/send_message',checkAuth,(req,res)=>{
//     console.log("In company send_message request");
//     console.log(req.body);
//     req.body.type = "send_message";
//     kafka.make_request('chat',req.body,(err,rows)=>{
//         if (err){
//             console.log(`${err.code}:${err.sqlMessage}`)
//             res.json({"error":"failure"})
//         }
//         else{
//         console.log(rows)
//         res.json({rows})
//         }
//     }) 
// })

///////////////#################///////////////////////
// router.get('/fetch_convos/:id',checkAuth,(req,res)=>{
//     console.log("In company fetch_convos request");
//     console.log(req.params);
//     req.body.id = req.params.id;
//     req.body.type = "fetch_convos";
//     kafka.make_request('chat',req.body,(err,rows)=>{
//         if (err){
//             console.log(`${err.code}:${err.sqlMessage}`)
//             res.json({"error":"failure"})
//         }
//         else{
//         console.log(rows)
//         res.json({rows})
//         }
//     }) 
// })



///////////////////////////////

module.exports = router
