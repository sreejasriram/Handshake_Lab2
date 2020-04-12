import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import NavbarPage from './LandingPage/Navbar';
import CmpySignup from './Company/Signup';
import CmpyLogin from './Company/Login';
import CmpyJobs from './Company/Jobs';
import CmpyHome from './Company/Home';
import CmpyEvents from './Company/Events';
import PostEvents from './Company/postEvents';
import EditEvents from './Company/EditEvents';
import EditJobs from './Company/EditJobs';
import ViewApplicants from './Company/ViewApplicants'
import ViewEventApplicants from './Company/ViewEventApplicants'
import ViewProfile from './Company/ViewProfile'
import CmpyProfile from './Company/Profile';
import Students from './Company/Students'
import CmpyMessages from './Company/Messages';


import StudLogin from './Student/Login';
import StudSignup from './Student/Signup';
import StudProfile from './Student/Profile';
import StudBasic from './Student/Basic';
import StudContact from './Student/Contact';
import StudSkill from './Student/Skill';
import StudEducation from './Student/Education';
import StudExperience from './Student/Experience';
import StudJobs from './Student/Jobs';
import JobDetails from './Student/JobDetails';
import EventDetails from './Student/EventDetails';
import companyDetails from './Student/ShowCompany';
import ViewRegisteredEvents from './Student/ViewRegisteredEvents';
import HandshakeStudents from './Student/Students'
import StudApplications from './Student/Applications';
import CompanyEvents from './Student/CompanyEvents';
import Messages from './Student/Messages';
import StudViewProfile from './Student/ViewProfile'







//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={NavbarPage}/>
               <Route path="/studlogin" component={StudLogin}/>
               <Route path="/studsignup" component={StudSignup}/>
               <Route path="/cmpylogin" component={CmpyLogin}/>
               <Route path="/cmpysignup" component={CmpySignup}/>
               <Route path="/jobs" component={CmpyJobs}/>
               <Route path="/studJobs" component={StudJobs}/>
               <Route path="/jobdetails" component={JobDetails}/>
               <Route path="/eventdetails/:eventId" component={EventDetails}/>
               <Route path="/companydetails/:jobId" component={companyDetails}/>
               <Route path="/viewRegisteredEvents/" component={ViewRegisteredEvents}/>
               <Route path="/students/" component={Students}/>
               <Route path="/HandshakeStudents/" component={HandshakeStudents}/>         
               <Route path="/applications" component={StudApplications}/>             
               <Route path="/home" component={CmpyHome}/>
               <Route path="/events" component={CmpyEvents}/>
               <Route path="/postEvents" component={PostEvents}/>
               <Route path="/editEvents/:eventId" component={EditEvents}/>
               <Route path="/editJobs/:jobId" component={EditJobs}/>
               <Route path="/ViewApplicants/:jobId" component={ViewApplicants}/>
               <Route path="/ViewEventApplicants/:eventId" component={ViewEventApplicants}/>
               <Route path="/companyMessages" component={CmpyMessages}/>
               
               <Route path="/StudViewProfile/:stud_id" component={StudViewProfile}/>

               

               
               <Route path="/ViewProfile/:stud_id" component={ViewProfile}/>
               <Route path="/profile" component={CmpyProfile}/>
                <Route path="/studprofile" component={StudProfile}/>
                <Route path="/basic" component={StudBasic}/>
                <Route path="/contact" component={StudContact}/>
                <Route path="/skill" component={StudSkill}/>
                <Route path="/education" component={StudEducation}/>
                <Route path="/experience" component={StudExperience}/>
                <Route path="/companyevents" component={CompanyEvents}/>
                <Route path="/messages" component={Messages}/>

                

                




               

            </div>
        )
    }
}
//Export The Main Component
export default Main;