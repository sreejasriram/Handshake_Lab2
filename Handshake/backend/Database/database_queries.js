// var connect_sql = require('../Database/database_connect');

// exports.student_signup = "Insert into student (fname,lname,email,pwd,clg) values (?,?,?,?,? )" ;
// exports.student_signin = "select stud_id from student where email=? and pwd=?" ;

// exports.student_select_prof = "select * from student_basic where stud_id=?" ;
// exports.student_insert_prof = "insert into student_basic (stud_id,name) values (?,? )" ;
// exports.student_update_prof = "update student_basic set name=? where stud_id=?" ;
// exports.get_student_profpic = "select * from student_basic INNER JOIN student_edu on student_basic.stud_id= student_edu.stud_id where student_basic.stud_id=?" ;


// exports.student_select_basic = "select * from student_basic where stud_id=?" ;
// exports.student_insert_basic = "insert into student_basic (stud_id,name,dob,city,state,country,career_obj) values (?,?,?,?,?,?,? )" ;
// exports.student_update_basic = "update student_basic set name=?,dob=?,city=?,state=?,country=?,career_obj=? where stud_id=?" ;
// exports.student_select_education = "select * from student_edu where stud_id=?" ;
// exports.student_insert_education = "Insert into student_edu (stud_id,clg,loc,degree,major,year,cgpa) values (?,?,?,?,?,?,? )" ;
// exports.student_update_education = "update student_edu set clg=?,loc=?,degree=?,major=?,year=?,cgpa=? where stud_id=?" ;
// exports.student_select_experience = "select * from student_exp where stud_id=?" ;
// exports.student_insert_experience = "Insert into student_exp (stud_id,cmpy_name,title,loc,start_date,end_date,work_desc) values (?,?,?,?,?,?,?) " ;
// exports.student_update_experience = "update student_exp set cmpy_name=?,title=?,loc=?,start_date=?,end_date=?,work_desc=? where stud_id=?" ;
// exports.student_select_Contact = "select * from student_contact where stud_id=?" ;
// exports.student_insert_Contact = "Insert into student_contact (stud_id,phone,email) values (?,?,?)" ;
// exports.student_update_Contact = "update student_contact set phone=?,email=? where stud_id=?" ;
// exports.student_select_Skill = "select * from student_skill where stud_id=?" ;
// exports.student_insert_Skill = "Insert into student_skill (stud_id,skill) values (?,?)" ;
// exports.student_update_Skill = "update student_skill set skill=? where stud_id=?" ;
// ////
// exports.company_signup = "Insert into company (name,email,pwd,loc) values (?,?,?,?)" ;
// ////
// exports.company_signin = "select cmpy_id from company where email=? and pwd=?" ;
// exports.company_jobs = "Insert into jobs (cmpy_id,title,posting_date,deadline,loc,salary,jobDesc,cat) values (?,?,?,?,?,?,?,?)" ;
// exports.company_select_basic = "select * from company where stud_id=?" ;
// exports.company_jobs_posted="select * from jobs where cmpy_id=?";
// exports.company_events = "Insert into events (cmpy_id,name,eventDesc,time,date,loc,elig) values (?,?,?,?,?,?,?)" ;
// exports.save_edited_event = "update events set name=?,eventDesc=?,time=?,date=?,loc=?,elig=? where cmpy_id=? and event_id=?" ;
// exports.save_edited_job = "update jobs set title=?,posting_date=?,deadline=?,loc=?,salary=?,jobDesc=?,cat=? where cmpy_id=? and job_id=?" ;
// exports.company_events_posted="select * from events where cmpy_id=?";
// exports.edit_event_retrieve="select * from events where cmpy_id=? and event_id=?";
// exports.edit_job_retrieve="select * from jobs where cmpy_id=? and job_id=?";


// exports.company_profile="select * from company where cmpy_id=?";
// exports.add_company_profile="update company set name=?,loc=?,cmpyDesc=?,contact=? where cmpy_id=?" ;
// exports.jobs_available="SELECT * FROM company INNER JOIN jobs ON  company.cmpy_id = jobs.cmpy_id;";
// exports.events_available="SELECT * FROM company INNER JOIN events ON  company.cmpy_id = events.cmpy_id order by events.date;";
// exports.apply_job="Insert into students_jobs (stud_id,cmpy_id,job_id,status,app_date,resume) values (?,?,?,?,?,?)" ;
// exports.apply_event="Insert into student_events (stud_id,cmpy_id,event_id) values (?,?,?)" ;


// exports.job_details="SELECT * FROM company INNER JOIN jobs ON  company.cmpy_id = jobs.cmpy_id where jobs.job_id=?";
// exports.events_details="SELECT * FROM company INNER JOIN events ON  company.cmpy_id = events.cmpy_id where events.event_id=?;"


// exports.event_already_applied="select * from student_events where stud_id=? and cmpy_id=? and event_id= ?" ;
// exports.get_student_eligibility = "SELECT major FROM student_edu where student_edu.stud_id=? UNION select elig FROM events where event_id=? and  cmpy_id=?"
// exports.job_already_applied="select * from students_jobs where stud_id=? and cmpy_id=? and job_id= ?" ;
// exports.list_applied_jobs="SELECT * FROM  company INNER JOIN jobs ON  company.cmpy_id = jobs.cmpy_id INNER JOIN students_jobs ON  students_jobs.job_id = jobs.job_id where students_jobs.stud_id=?;"
// exports.list_applied_events="SELECT * FROM  company INNER JOIN events ON  company.cmpy_id = events.cmpy_id INNER JOIN student_events ON  student_events.event_id = events.event_id where student_events.stud_id=?;"

// exports.get_student_profile="SELECT * FROM  student_basic INNER JOIN student_edu ON  student_basic.stud_id = student_edu.stud_id INNER JOIN student_contact ON  student_basic.stud_id = student_contact.stud_id  INNER JOIN student_exp ON  student_basic.stud_id = student_exp.stud_id INNER JOIN student_skill ON  student_basic.stud_id = student_skill.stud_id where student_basic.stud_id=?;"
// exports.list_applicants="select * from students_jobs INNER JOIN student_contact ON  students_jobs.stud_id = student_contact.stud_id INNER JOIN student_basic ON  students_jobs.stud_id = student_basic.stud_id where cmpy_id=? and job_id=?;"
// //exports.list_applicants="select * from students_jobs outer JOIN student_contact ON  students_jobs.stud_id = student_contact.stud_id outer JOIN student_basic ON  students_jobs.stud_id = student_basic.stud_id where cmpy_id=? and job_id=?;"

// exports.list_event_applicants="select * from student_events INNER JOIN student_contact ON  student_events.stud_id = student_contact.stud_id INNER JOIN student_basic ON  student_events.stud_id = student_basic.stud_id where cmpy_id=? and event_id=?;"
  
// exports.list_all_students="SELECT * FROM  student_basic INNER JOIN student_exp ON  student_basic.stud_id = student_exp.stud_id INNER JOIN student_edu ON  student_basic.stud_id = student_edu.stud_id INNER JOIN student_skill ON  student_basic.stud_id = student_skill.stud_id;"

// exports.updateStudentstatus="update students_jobs set status=? where cmpy_id =? and job_id = ? and stud_id = ?"








// //cmpy_id,name,eventDesc,time,date,loc,Elig(SE,CE,CS,all)

// //exports.company_insert_basic = "insert into Company (stud_id,name,dob,city,state,country,career_obj) values (?,?,?,?,?,?,? )" ;
// //exports.company_update_basic = "update Company set name=?,dob=?,city=?,state=?,country=?,career_obj=? where stud_id=?" ;
