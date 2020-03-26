var express = require('express');
var router = express.Router();
var app = express();
var CmpnyRepo = require('../Repository/Company_Repository');
var multer  = require('multer')
var path = require('path');
const Student = require('../Models/StudentModel');
const Company = require('../Models/CompanyModel');



/////////////////
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
	           
	            cb(null, req.body.job_id + req.body.stud_id + path.extname(file.originalname))
	        } else {
	

	            cb(null,  req.body.stud_id + path.extname(file.originalname))
	        }
	    }
	});
	const upload = multer({
	    storage
	})




router.post('/apply_job',upload.single('file'),(req,res)=>{
    console.log("In company apply jobs post request");
    console.log(req.body);
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

      
    CmpnyRepo.job_apply(appDat,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else
        res.json({"result":"success"})
    })   })
}
})




router.post('/company_signup',(req,res)=>{
    console.log("In Company signup post request");
    console.log(req.body);
    CmpnyRepo.company_signup(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else
        res.json({"result":"success"})
    }) 
})



router.get('/company_signin/:email/:password',(req,res)=>{
    console.log("In company signin post request");
    console.log(req.params);
        CmpnyRepo.company_signin(req.params,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})

        }
        else if (rows){
            console.log(`company found`)
            res.cookie('company',req.params.email,{maxAge: 90000000, httpOnly: false, path : '/'});
            res.json({"result": rows._id})
            }
        else {
            console.log(rows)
            console.log(`company not found`)
            res.json({"error":"failure"})

        }
    }) 
})


router.post('/company_jobs',(req,res)=>{
    console.log("In company jobs post request");
    console.log(req.body);
    CmpnyRepo.jobs(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else
        res.json({"result":"success"})
    }) 
})


router.post('/company_jobs_retrieve',(req,res)=>{
    console.log("In company jobs retrieve post request");
    console.log(req.body);
    CmpnyRepo.jobs_retrieve(req.body,(err,rows)=>{
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

router.post('/all_jobs_retrieve',(req,res)=>{
    console.log("In company jobs retrieve post request");
    CmpnyRepo.all_jobs_retrieve((err,rows)=>{
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
router.post('/list_all_students',(req,res)=>{
    console.log("In company students retrieve post request");
    CmpnyRepo.list_all_students((err,rows)=>{
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

router.post('/all_events_retrieve',(req,res)=>{
    console.log("In company events retrieve post request");
    CmpnyRepo.all_events_retrieve((err,rows)=>{
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

router.post('/jobs_details',(req,res)=>{
    console.log("In company jobs retrieve post request");
    console.log(req.body)
    CmpnyRepo.jobs_details(req.body,(err,rows)=>{
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

router.post('/events_details',(req,res)=>{
    console.log("In company event details retrieve post request");
    console.log(req.body)
    CmpnyRepo.events_details(req.body,(err,rows)=>{
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


router.post('/apply_event',(req,res)=>{
    console.log("In company apply event post request");
    console.log(req.body);
    CmpnyRepo.apply_event(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else
        res.json({"result":"success"})
    }) 
})
router.post('/job_already_applied',(req,res)=>{
    console.log("In company jobs post request");
    console.log(req.body);
    CmpnyRepo.job_already_applied(req.body,(err,rows)=>{
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
router.post('/event_already_applied',(req,res)=>{
    console.log("In company events already applied post request");
    console.log(req.body);
    CmpnyRepo.event_already_applied(req.body,(err,rows)=>{
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

router.post('/list_applied_jobs',(req,res)=>{
    console.log("In company list jobs post request");
    console.log(req.body);
    CmpnyRepo.list_applied_jobs(req.body,(err,rows)=>{
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
router.post('/list_applied_events',(req,res)=>{
    console.log("In company list_applied_events post request");
    console.log(req.body);
    CmpnyRepo.list_applied_events(req.body,(err,rows)=>{
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
router.put('/updateStudentstatus', (req,res)=>{
    CmpnyRepo.updateStudentstatus(req.body,(err,result)=>{
        console.log(req.body)
        if (err){
            res.json({"error":err})
        }
        else{
            res.json({'result':result})}
    })
})


router.post('/company_events',(req,res)=>{
    console.log("In company Event post request");
    console.log(req.body);
    CmpnyRepo.events(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else
        res.json({"result":"success"})
    }) 
})
router.post('/save_edited_event',(req,res)=>{
    console.log("In company save event post request");
    console.log(req.body);
    CmpnyRepo.save_edited_event(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else
        res.json({"result":"success"})
    }) 
})
router.post('/save_edited_job',(req,res)=>{
    console.log("In company save_edited_job post request");
    console.log(req.body);
    CmpnyRepo.save_edited_job(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else
        res.json({"result":"success"})
    }) 
})
router.post('/edit_job_retrieve',(req,res)=>{
    console.log("In company edit_job_retrieve post request");
    console.log(req.body);
    CmpnyRepo.edit_job_retrieve(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else{
        console.log(rows)
        res.json({rows})}
        
    }) 
})


router.post('/company_events_retrieve',(req,res)=>{
    console.log("In company events retrieve post request");
    console.log(req.body);
    CmpnyRepo.events_retrieve(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else{
        console.log(rows)
        res.json({rows})}
        
    }) 
})

router.post('/edit_event_retrieve',(req,res)=>{
    console.log("In company events retrieve post request");
    console.log(req.body);
    CmpnyRepo.edit_event_retrieve(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else{
        console.log(rows)
        res.json({rows})}
        
    }) 
})



router.post('/company_profile',(req,res)=>{
    console.log("In company profile retrieve post request");
    console.log(req.body);
    CmpnyRepo.profile_retrieve(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else{
        console.log(rows)
        res.json({rows})}
        
    }) 
})


router.post('/save_company_profile',(req,res)=>{
    console.log("In company profile save post request");
    console.log(req.body);
    CmpnyRepo.profile_save(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else{
        console.log(rows)
        res.json({rows})}
        
    }) 
})


router.post('/get_student_profile',(req,res)=>{
    console.log("In student profile view from company post request");
    console.log(req.body);
    CmpnyRepo.get_student_profile(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else{
        console.log(rows)
        res.json({rows})}
        
    }) 
})
router.post('/list_applicants',(req,res)=>{
    console.log("In list applicants from company post request");
    console.log(req.body);
    CmpnyRepo.list_applicants(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else{
        console.log(rows)
        res.json({rows})}
        
    }) 
})
router.post('/list_event_applicants',(req,res)=>{
    console.log("In list applicants from company post request");
    console.log(req.body);
    CmpnyRepo.list_event_applicants(req.body,(err,rows)=>{
        if (err){
            console.log(`${err.code}:${err.sqlMessage}`)
            res.json({"error":"failure"})
        }
        else{
        console.log(rows)
        res.json({rows})}
        
        
    }) 
})



module.exports = router