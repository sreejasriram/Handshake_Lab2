var express = require('express');
var router = express.Router();
var app = express();
var CmpnyRepo = require('../Repository/Company_Repository');
var multer  = require('multer')
var path = require('path');
const Student = require('../Models/StudentModel');
const Company = require('../Models/CompanyModel');
var kafka = require('../kafka/client');
const { checkAuth } = require("../utils/passport");
const jwt = require('jsonwebtoken');
var { secret } = require("../utils/config");
const { auth } = require("../utils/passport");
// const { studauth } = require("../utils/passport");



/////////////////
const fs = require('fs');
	const AWS = require('aws-sdk');
	const s3 = new AWS.S3({
	    accessKeyId:
	        "",
	    secretAccessKey:
	        ""
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
	           
	            cb(null, req.body.job_id + req.body.stud_id + path.extname(file.originalname))
	        } else {
	

	            cb(null,  req.body.companyId + path.extname(file.originalname))
	        }
	    }
	});
	const upload = multer({
	    storage
	})




router.post('/apply_job',checkAuth,upload.single('file'),(req,res)=>{
    console.log("In company apply jobs post request");
    console.log(req.body);
    // req.body.job_id='5e852fb5240b073600cc43ee'
    if (req.file) {
        const fileContent = fs.readFileSync('./public/applications/' + req.body.job_id + req.body.stud_id + path.extname(req.file.originalname));
        const params = {
            Bucket: 'handshakesreeja',
            Key: req.body.job_id + req.body.stud_id + path.extname(req.file.originalname),
            Body: fileContent,
            ContentType: req.file.mimetype
        };
        s3.upload(params, function (err, data) {
            if (err) {
                 return res.status(500).json({ "error": err.message })
                // console.log(`${err.code}:${err.sqlMessage}`)
                // res.json({"error":"failure"})
            }else{
            console.log(data);
            var appDat = {
                ...req.body,
                resume: data.Location}
            }

            appDat.type = "apply_job";

            kafka.make_request('jobs',appDat,(err,rows)=>{
    // CmpnyRepo.job_apply(appDat,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else
        res.json({"result":"success"})
    })   })
}
})

/////////////////////////////

router.post('/uploadpic',checkAuth, upload.single('profilepic'), async (req, response) => {
    try {
      if (req.file) {
        const fileContent = fs.readFileSync(`./public/images/${req.body.companyId}${path.extname(req.file.originalname)}`);
        console.log(fileContent)
        console.log(req.body)
        console.log(req.body.companyId);
        const params = {
            Bucket: 'handshakesreeja',
            Key: req.body.companyId + path.extname(req.file.originalname),
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
            profilepic.type = 'companyprofilepic'
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


///////////////////////////////
router.get('/company_signin/:email/:password',(req,res)=>{
    auth();
    console.log("In company signin post request");
    console.log(req.params);
    kafka.make_request('company-signin',req.params,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})

        }
        else if (rows.length){
            console.log(`company found`)
            const payload = { _id: rows[0]._id, username: req.params.email};
            console.log(rows[0]._id)
            console.log(req.params.email)
            const token = jwt.sign(payload, secret, {
                expiresIn: 100800000
            });
            // res.status(200).end("JWT " + token);
            res.cookie('company',req.params.email,{maxAge: 90000000, httpOnly: false, path : '/'});
            console.log(rows)
            console.log("token is")
            console.log(token)
            // res.json({"result": rows[0]._id})
            res.json({"result":"JWT " +token})

            }
        else {
            console.log(rows)
            console.log(`company not found`)
            res.json({"error":"failure"})

        }
    }) 
})



router.get('/getjobs/:companyId', checkAuth,(req,res)=>{
    // router.get('/getjobs/:companyId',(req,res)=>{

    console.log("In company jobs retrieve post request");
    console.log(req.params);
    req.body.type = "retrieve";
    req.body.companyId = req.params.companyId;
    kafka.make_request('jobs',req.body,(err,rows)=>{
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


//////////////////////////




router.post('/company_signup',(req,res)=>{
    console.log("In Company signup post request");
    console.log(req.body);
    kafka.make_request('company-signup',req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else
        res.json({"result":"success"})
    }) 
})







router.post('/post_job',checkAuth,(req,res)=>{
    // router.post('/post_job',(req,res)=>{

    console.log("In company jobs post request");
    console.log(req.body);
    req.body.type = "add";
    kafka.make_request('jobs',req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else
        res.json({"result":"success"})
    }) 
})





router.post('/post_events',checkAuth,(req,res)=>{
    console.log("In company Event post request");
    console.log(req.body);
    req.body.type = "add";
    kafka.make_request('company-events',req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else
        res.json({"result":"success"})
    }) 
})








router.get('/getevents/:companyId',checkAuth,(req,res)=>{
    console.log("In company events retrieve post request");
    console.log(req.params);
    req.body.type = "retrieve";
    req.body.companyId = req.params.companyId;
    kafka.make_request('company-events',req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else{
        console.log(rows)
        res.json({rows})}
        
    }) 
})

router.get('/list_event_applicants/:eventId',checkAuth,(req,res)=>{
    console.log("In list event applicants from company get request");
    console.log(req.params);
    req.body.type = "list_event_applicants";
    req.body.eventId = req.params.eventId;

    kafka.make_request('company-events',req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else{
        console.log(rows)
        res.json({rows})}      
    }) 
})

router.get('/list_applicants/:jobId',checkAuth,(req,res)=>{
    console.log("In list job applicants from company post request");
    console.log(req.params);
    req.body.type = "list_job_applicants";
    req.body.jobId = req.params.jobId;

    kafka.make_request('jobs',req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else{
        console.log(rows)
        res.json({rows})}
        
    }) 
})


router.put('/updateStudentstatus',checkAuth, (req,res)=>{
    console.log(req.body);
    req.body.type = "update_job_status";
    kafka.make_request('jobs',req.body,(err,rows)=>{
        console.log(req.body)
        if (err){
            res.json({"error":err})
        }
        else{
            res.json({'result':rows})}
    })
})


///////////////#################///////////////////////
router.get('/get_student_profile/:studentId',checkAuth,(req,res)=>{
    console.log("In get_student_profile get request");
    console.log(req.params);
    req.body.type = "list_event_applicants_profile";
    req.body.studentId = req.params.studentId;

    kafka.make_request('company-events',req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else{
        console.log(rows)
        res.json({rows})}
        
    }) 
})


///////////////#################///////////////////////
// router.get('/list_all_students',checkAuth,(req,res)=>{
    router.get('/list_all_students',(req,res)=>{

    console.log("In list_all_students from company retrieve post request");
    req.body.type = "list_all_students_company";
    // kafka.make_request('profile',req.body,(err,rows)=>{
        kafka.make_request('testTopic',req.body,(err,rows)=>{

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

///////////////#################///////////////////////
router.post('/send_message',checkAuth,(req,res)=>{
    console.log("In company send_message request");
    console.log(req.body);
    req.body.type = "send_message";
    kafka.make_request('chat',req.body,(err,rows)=>{
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

///////////////#################///////////////////////
router.get('/fetch_convos/:id',checkAuth,(req,res)=>{
    console.log("In company fetch_convos request");
    console.log(req.params);
    req.body.id = req.params.id;
    req.body.type = "fetch_convos";
    kafka.make_request('chat',req.body,(err,rows)=>{
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











router.get('/job_already_applied/:jobId/:studentId',checkAuth,(req,res)=>{
    console.log("In company job_already_applied get request");
    req.body.type="job_already_applied"
    req.body.jobId = req.params.jobId;
    req.body.studentId = req.params.studentId;
    console.log(req.body);
    kafka.make_request('jobs',req.body,(err,rows)=>{
        console.log("already job applied result");

        console.log(rows);
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else if (rows.length != 0){
            res.json({"result":"success"})

            }
        else {
            res.json({"error":"failure"})

        }
    }) 
})

router.get('/event_already_applied/:eventId/:studentId',checkAuth,(req,res)=>{
    // router.get('/event_already_applied/:eventId/:studentId',(req,res)=>{

    console.log("In company events already applied get request");
    req.body.type="event_already_applied"
    req.body.eventId = req.params.eventId;
    req.body.studentId = req.params.studentId;
    // console.log(req.body);
    kafka.make_request('company-events',req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else if (rows.length != 0){
            res.json({"result":"success"})

            }
        else {
            res.json({"error":"failure"})

        }
    }) 
})

router.get('/get_student_eligibility/:eventId/:studentId',checkAuth,(req,res)=>{
    console.log("In get_student_eligibility get request");
    console.log("aaaaaaaaaa")
    req.body.type="check_student_eligibility"
    req.body.eventId = req.params.eventId;
    req.body.studentId = req.params.studentId;
    console.log(req.body);
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


router.get('/profile/:id',checkAuth,(req,res)=>{
    console.log("In company get complete profile request");
    console.log(req.params);
        req.body.type = "retrieve_company_profile";
        req.body.companyId = req.params.id;
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

router.put('/updateprofile',checkAuth,(req,res)=>{
    // router.put('/updateprofile',(req,res)=>{
    console.log("In company profile post request");
    console.log(req.body);
    req.body.type = "profile_company_update";
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










// router.post('/save_edited_event',(req,res)=>{
//     console.log("In company save event post request");
//     console.log(req.body);
//     CmpnyRepo.save_edited_event(req.body,(err,rows)=>{
//         if (err){
//             console.log(`${err.code}:${err.sqlMessage}`)
//             res.json({"error":"failure"})
//         }
//         else
//         res.json({"result":"success"})
//     }) 
// })
// router.post('/save_edited_job',(req,res)=>{
//     console.log("In company save_edited_job post request");
//     console.log(req.body);
//     CmpnyRepo.save_edited_job(req.body,(err,rows)=>{
//         if (err){
//             console.log(`${err.code}:${err.sqlMessage}`)
//             res.json({"error":"failure"})
//         }
//         else
//         res.json({"result":"success"})
//     }) 
// })
// router.post('/edit_job_retrieve',(req,res)=>{
//     console.log("In company edit_job_retrieve post request");
//     console.log(req.body);
//     CmpnyRepo.edit_job_retrieve(req.body,(err,rows)=>{
//         if (err){
//             console.log(`${err.code}:${err.sqlMessage}`)
//             res.json({"error":"failure"})
//         }
//         else{
//         console.log(rows)
//         res.json({rows})}
        
//     }) 
// })




// router.post('/edit_event_retrieve',(req,res)=>{
//     console.log("In company events retrieve post request");
//     console.log(req.body);
//     CmpnyRepo.edit_event_retrieve(req.body,(err,rows)=>{
//         if (err){
//             console.log(`${err.code}:${err.sqlMessage}`)
//             res.json({"error":"failure"})
//         }
//         else{
//         console.log(rows)
//         res.json({rows})}
        
//     }) 
// })



// router.post('/company_profile',(req,res)=>{
//     console.log("In company profile retrieve post request");
//     console.log(req.body);
//     CmpnyRepo.profile_retrieve(req.body,(err,rows)=>{
//         if (err){
//             console.log(`${err.code}:${err.sqlMessage}`)
//             res.json({"error":"failure"})
//         }
//         else{
//         console.log(rows)
//         res.json({rows})}
        
//     }) 
// })


// router.post('/save_company_profile',(req,res)=>{
//     console.log("In company profile save post request");
//     console.log(req.body);
//     CmpnyRepo.profile_save(req.body,(err,rows)=>{
//         if (err){
//             console.log(`${err.code}:${err.sqlMessage}`)
//             res.json({"error":"failure"})
//         }
//         else{
//         console.log(rows)
//         res.json({rows})}
        
//     }) 
// })







module.exports = router