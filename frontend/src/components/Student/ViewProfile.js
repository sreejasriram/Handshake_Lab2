
import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Card, Avatar } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { environment } from '../../Utils/constants';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CakeOutlinedIcon from '@material-ui/icons/CakeOutlined';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import emptyPic from '../../images/empty-profile-picture.png';



class ViewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stud_id: this.props.match.params.stud_id,
            name: "",
            image: "",
            dob: "",
            city: "",
            state: "",
            country: "",
            career_objective: "",
            skills: "",
            mobile: "",
            email: "",
            college: "",
            education: [],
            experience: [],
            college_name: "",
            edulocation: "",
            degree: "",
            major: "",
            year_of_starting: "",
            year_of_passing: "",
            month_of_starting: "",
            month_of_passing: "",
            cgpa: "",
            company: "",
            title: "",
            location: "",
            year_of_starting: "",
            year_of_ending: "",
            month_of_starting: "",
            month_of_ending: "",
            description: "",
            dataRetrieved: false,
            profileData: [],
            currentstudentId: "",
            messagestudent: false,
            mess: "",
            redirectToMessages: false,
            emptyprofilepic:emptyPic,

        }
        this.messageStudent = this.messageStudent.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.sendMessage = this.sendMessage.bind(this);




    }





    messageStudent = (studentId) => {
        console.log(studentId)
        this.setState(currentState => ({
            messagestudent: !currentState.messagestudent,
            currentstudentId: studentId
        }))
    }

    inputChangeHandler = (e) => {
        const value = e.target.value
        this.setState({
            [e.target.name]: value
        })
    }



    sendMessage = () => {
        // e.preventDefault();
        let currentdate = new Date()

        const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
        const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(currentdate)

        let datestr = mo + " " + da + " " + ye + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds()

        let data = null
        data = {
            id1: sessionStorage.getItem('id'),
            id2: this.state.stud_id,
            update: {
                id1: {
                    sender: sessionStorage.getItem('id'),
                    persona: "students"
                },
                id2: {
                    receiver: this.state.stud_id,
                    persona: "students"
                },
                $push: {
                    messages: [{
                        fromId: sessionStorage.getItem('id'),
                        message: this.state.mess,
                        dateTime: datestr
                        // dateTime: currentdate.getDay() + " " + currentdate.getMonth() + " " + currentdate.getDate() + " " + currentdate.getFullYear() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds()
                    }]
                }
            }
        }

        console.log(data)
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        axios.post(environment.baseUrl + '/student/send_message', data)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data)
                if (response.data) {
                    // <Redirect to={`/companyMessages/${this.state.studId}`} />
                    this.setState({ redirectToMessages: true })


                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                }
            }
            )
    }



    componentDidMount() {
        const data = {
            id: this.state.stud_id
        }
        console.log(data)
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        axios.get(environment.baseUrl + '/student/get_student_profile/' + data.id)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                if (response.data.rows) {
                    this.setState({
                        dataRetrieved: true,
                        profileData: response.data.rows,
                        name: response.data.rows[0].name,
                        dob: response.data.rows[0].dob,
                        city: response.data.rows[0].city,
                        state: response.data.rows[0].state,
                        country: response.data.rows[0].country,
                        career_objective: response.data.rows[0].career_objective,
                        skills: response.data.rows[0].skills,
                        mobile: response.data.rows[0].mobile,
                        email: response.data.rows[0].email,
                        college: response.data.rows[0].college,
                        education: response.data.rows[0].education,
                        experience: response.data.rows[0].experience,
                        image: response.data.rows[0].image,
                       
                    });
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                }
            })
    }


    render() {
        let profileData = this.state.profileData;
        console.log(profileData)
        let renderRedirect = null;
        let k = null
        if (this.state.redirectToMessages)
            k = <Redirect to={`/companyMessages/`} />

        if (profileData.length > 0) {
            renderRedirect =
                <div>
                    <div class="row">
                        <div class="col-md-1"> </div>
                        <div class="col-md-3">
                            {/* profilepic */}
                            <Card>
                                <CardContent>
                                <center>
                                    <div class="row">
                                        {/* <div class="col-md-10"> */}
                                          <Avatar src={this.state.image?this.state.image:this.state.emptyprofilepic} style={{ width: '104px', height: '104px', borderRadius: '50%', textAlign: 'center' }}></Avatar>
                                            <Typography color="black" gutterBottom>
                                                <h4><b>{this.state.name.length?this.state.name:""}</b></h4>
                                            </Typography>
                                        {/* </div> */}

                                    </div>

                                    <p>{this.state.college.length?this.state.college:""}</p>
                                    
                                    <p>{this.state.education.length?this.state.education[0].degree:""} {this.state.education.length?this.state.education[0].major:""} </p>
                                     {this.state.education.length?(<div>CGPA:{this.state.education[0].cgpa}</div>):<div></div>} 

                                     <button class="btn btn-primary" style={{ backgroundColor: '#1569E0', border: '0px',width:'100%'}} onClick={() => this.messageStudent()}>Message</button>
                                    </center>

                                    <Dialog
                                                aria-labelledby="simple-modal-title"
                                                aria-describedby="simple-modal-description"
                                                open={this.state.messagestudent}>
                                                <div>
                                                <b> <h4 id="simple-modal-title" style={{ padding: '10px'}}>Message</h4></b>
                                                    <DialogContent style={{ width: '400px', height: '200px' }}>
                                                        <textarea type="text" name="mess" onChange={this.inputChangeHandler} placeholder="Type your message here.." rows="4" cols="50" style={{resize:'none',borderRadius:'1px'}}/>
                                                       
                                                            <div class='row'>
                                                            <div className='col-md-6'></div>
                                                            <div className='col-md-2'>
                                                       
                                                                <button onClick={() => { this.sendMessage() }} class="btn btn-primary" style={{ backgroundColor: '#1569E0', borderRadius: '5px',margin:'5px',padding:'5px' }}>send</button><br /><br />
                                                                </div>  <div className='col-md-2'>
                                                                <button onClick={() => { this.messageStudent() }} class="btn btn-primary" style={{ backgroundColor: '#1569E0', borderRadius: '5px',margin:'5px',padding:'5px' }}>cancel</button>
                                                            </div>
                                                            
                                                        </div>
                                                    </DialogContent>
                                                </div>
                                            </Dialog>
                                </CardContent>
                            </Card>

<br/>
                            {/* <Basic /> */}
                            <Card>
                                <CardContent>
                                    <div class="row">
                                        <div class="col-md-10">
                                            <Typography color="black" gutterBottom>
                                                <b><p style={{ fontSize: '24px' }}>Personal Info</p></b>
                                            </Typography>
                                            
                                        </div>
                                    </div>
                                    {this.state.dob?(<div><CakeOutlinedIcon></CakeOutlinedIcon> {this.state.dob}</div>):<div></div>} 
                                    {this.state.city?(<div><LocationOnOutlinedIcon></LocationOnOutlinedIcon> {this.state.city} {this.state.state} {this.state.country}</div>):<div></div>} 

                                   



                                </CardContent>
                            </Card>
                            <br />
                            {/* <Skill /> */}

                            <Card>
                                <CardContent>
                                    <div class="row">
                                        <div class="col-md-10">

                                            <Typography color="black" gutterBottom>
                                                <b><p style={{ fontSize: '24px' }}>Skills</p></b>
                                            </Typography>
                                        </div>

                                    </div>
                                    <p>{this.state.skills?this.state.skills:""}</p>
                                </CardContent>
                            </Card>
                            <br />
                        </div>
                        <div class="col-md-7">
                            {/* career objective */}
                            <Card>
                                <CardContent>
                                    <div class="row">
                                        <div class="col-md-10">
                                            <Typography color="black" gutterBottom>
                                                <b><p style={{ fontSize: '24px' }}>My Journey</p></b>

                                            </Typography>
                                            <p>{this.state.career_objective?this.state.career_objective:""}</p>

                                        </div>
                                    </div>

                                </CardContent>
                            </Card>

                            <br />
                            {/* Education */}
                            <Card>
                                <CardContent>
                                    <div class="row">
                                        <div class="col-md-10">

                                            <Typography color="black" gutterBottom>
                                                <b><p style={{ fontSize: '24px' }}>Education</p></b>
                                            </Typography>
                                        </div>

                                    </div>
                                    {this.state.education.map((data, index) => {
                                        return (
                                            <div>
                                        {data.college_name?(<div><b><SchoolRoundedIcon></SchoolRoundedIcon> {data.college_name}</b></div>):<div></div>} 
                                        {data.degree?(<div><GradeOutlinedIcon></GradeOutlinedIcon> {data.degree}</div>):<div></div>} 
                                        <div> {data.year_of_starting?data.year_of_starting:""}/{data.month_of_starting?data.month_of_starting:""}-{data.year_of_passing?data.year_of_passing:""}/{data.month_of_passing?data.month_of_passing:""}</div>
                                        {data.major?(<div><b>Major in</b> {data.major}</div>):<div></div>} 
                                        {data.cgpa?(<div><b>Cummulative GPA</b> {data.cgpa}</div>):<div></div>} 

                                        
                                            <hr/>
                                            </div>)
                                    })}

                                </CardContent>
                            </Card>
                            <br />

                            {/*Experience */}
                            <Card>
                                <CardContent>
                                    <div class="row">
                                        <div class="col-md-10">

                                            <Typography color="black" gutterBottom>
                                                <b><p style={{ fontSize: '24px' }}>Experience</p></b>
                                            </Typography>
                                        </div>

                                    </div>
                                    {this.state.experience.map((data, index) => {
                                        return (
                                            <div>
                                        {data.company?(<div> <h4><b><WorkOutlineOutlinedIcon></WorkOutlineOutlinedIcon> {data.company}</b></h4></div>):<div></div>} 
                                        {data.title?(<div><PersonOutlinedIcon></PersonOutlinedIcon> {data.title}</div>):<div></div>} 
                                        {data.location?(<div><LocationOnOutlinedIcon></LocationOnOutlinedIcon> {data.location}</div>):<div></div>} 
                                        {data.year_of_starting?(<div><DateRangeOutlinedIcon></DateRangeOutlinedIcon> {data.year_of_starting?data.year_of_starting:""}/{data.month_of_starting?data.month_of_starting:""} - {data.year_of_ending?data.year_of_ending:""}/{data.month_of_ending?data.month_of_ending:""}</div>):<div></div>} 

                                        
                                            <hr/>
                                            </div>)
                                    })}

                                </CardContent>
                            </Card>
                            {/* Contact  */}
                            <br />
                            <Card>
                                <CardContent>
                                    <div class="row">
                                        <div class="col-md-10">

                                            <Typography color="black" gutterBottom>
                                                <b><p style={{ fontSize: '24px' }}>Contact Information</p></b>
                                            </Typography>
                                        </div>

                                    </div>
                                    {this.state.mobile?(<div><PhoneOutlinedIcon></PhoneOutlinedIcon> {this.state.mobile}</div>):<div></div>} 
                                    {this.state.email?(<div><EmailOutlinedIcon></EmailOutlinedIcon> {this.state.email}</div>):<div></div>} 
                                </CardContent>
                            </Card>

                        </div>
                        <div class="col-md-1"> </div>
                    </div>

                    <br /><br />
                </div>
        }


        return (
            <div>
                {k}
                {renderRedirect}
            </div>
        )

    }
}
export default ViewProfile;