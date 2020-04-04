
import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {environment} from '../../Utils/constants';


class ViewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stud_id: this.props.match.params.stud_id,
            name: "",
            dob: "",
            city: "",
            state: "",
            country: "",
            career_objective: "",
            skills: "",
            mobile: "",
            email: "",
            college:"",
            education:[


            ],
            experience:[],
            college_name: "",
            edulocation: "",
            degree: "",
            major: "",
            year_of_starting: "",
            year_of_passing:"",
            month_of_starting: "",
            month_of_passing:"",
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
            profileData: []
        }
    }



    componentDidMount() {
        const data = {
            id: this.state.stud_id
        }
        console.log(data)
        axios.get(environment.baseUrl+'/company/get_student_profile/'+data.id)
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
                        experience:response.data.rows[0].experience
                        // loc: response.data.rows[0].loc,
                        // degree: response.data.rows[0].degree,
                        // major: response.data.rows[0].major,
                        // year: response.data.rows[0].year,
                        // cgpa: response.data.rows[0].cgpa,
                        // cmpy_name: response.data.rows[0].cmpy_name,
                        // title: response.data.rows[0].title,
                        // start_date: response.data.rows[0].start_date,
                        // end_date: response.data.rows[0].end_date,
                        // work_desc: response.data.rows[0].work_desc
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
        if (profileData.length > 0) {
            renderRedirect =
                <div>
                    <div class="row">
                        <div class="col-md-1"> </div>
                        <div class="col-md-3">
                            {/* <Basic /> */}
                            <Card>
                                        <CardContent>
                                        <div class="row">
                                            <div class="col-md-10">
                                            <Typography color="black" gutterBottom>
                                                <b><p style={{ fontSize: '24px' }}>{this.state.name}</p></b>
                                            </Typography>
                                            </div>
                                            </div>
                                            <p>{this.state.dob}</p>
                                            <p>{this.state.city} {this.state.state} {this.state.country} </p>
                                            <p>{this.state.career_objective}</p>

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
                                    <p>{this.state.skills}</p>
                                    </CardContent>
                                        </Card>
                                    <br />
                        </div>
                        <div class="col-md-7">
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
                                   { this.state.education.map((data,index)=>{
                                       return(
                                           <div>
                                        <p>{data.college_name}</p>
                                        <p>{data.location}</p>
                                        <p>{data.degree} {data.major} </p>
                                        <p>{data.year_of_starting}/{data.month_of_starting}-{data.year_of_passing}/{data.month_of_passing}</p>
                                        <hr/>
                                        </div> )
                                    })}
                                   
                                </CardContent>
                            </Card>
                            <br/>

                            {/*Experience */}
                            {/* <Card>
                                <CardContent>
                                    <div class="row">
                                        <div class="col-md-10">

                                            <Typography color="black" gutterBottom>
                                                <b><p style={{ fontSize: '24px' }}>Work Experience</p></b>
                                            </Typography>
                                        </div>

                                    </div>
                                    <p>{this.state.title} at {this.state.company}</p>
                                    <p>{this.state.location}</p>
                                    <p>{this.state.start_date.substring(0, 10)} - {this.state.end_date.substring(0, 10)}</p>
                                </CardContent>
                            </Card> */}
                            {/* Contact  */}
                                <br/>
                            <Card>
                                        <CardContent>
                                        <div class="row">
                                            <div class="col-md-10">

                                            <Typography color="black" gutterBottom>
                                            <b><p style={{ fontSize: '24px' }}>Personal Information</p></b>
                                            </Typography>
                                            </div>
                                           
                                            </div>
                                    <p>{this.state.mobile}</p>
                                    <p>{this.state.email}</p>
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
                {renderRedirect}
            </div>
        )

    }
}
export default ViewProfile;