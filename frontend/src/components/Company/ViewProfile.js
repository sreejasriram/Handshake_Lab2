
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


const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


///
class ViewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stud_id: this.props.match.params.stud_id,
            name: "",
            date: "",
            city: "",
            state: "",
            country: "",
            career_obj: "",
            skill: "",
            phone: "",
            email: "",
            clg: "",
            loc: "",
            degree: "",
            major: "",
            year: "",
            cgpa: "",
            cmpy_name: "",
            title: "",
            cmpyloc: "",
            start_date: "",
            end_date: "",
            work_desc: "",
            dataRetrieved: false,
            profileData: []
        }
    }



    componentDidMount() {
        const data = {
            id: this.state.stud_id
        }
        console.log(data)
        axios.post(environment.baseUrl+'/company/get_student_profile', data)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                if (response.data.rows) {
                    this.setState({
                        dataRetrieved: true,
                        profileData: response.data.rows,
                        name: response.data.rows[0].name,
                        date: response.data.rows[0].dob,
                        city: response.data.rows[0].city,
                        state: response.data.rows[0].state,
                        country: response.data.rows[0].country,
                        career_obj: response.data.rows[0].career_obj,
                        skill: response.data.rows[0].skill,
                        phone: response.data.rows[0].phone,
                        email: response.data.rows[0].email,
                        clg: response.data.rows[0].clg,
                        loc: response.data.rows[0].loc,
                        degree: response.data.rows[0].degree,
                        major: response.data.rows[0].major,
                        year: response.data.rows[0].year,
                        cgpa: response.data.rows[0].cgpa,
                        cmpy_name: response.data.rows[0].cmpy_name,
                        title: response.data.rows[0].title,
                        start_date: response.data.rows[0].start_date,
                        end_date: response.data.rows[0].end_date,
                        work_desc: response.data.rows[0].work_desc
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
                                            {/* <p>{this.state.dob.substring(0, 10)}</p> */}
                                            <p>{this.state.city} {this.state.state} {this.state.country} </p>
                                            <p>{this.state.career_obj}</p>

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
                                    <p>{this.state.skill}</p>
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
                                    <p>{this.state.clg}</p>
                                    <p>{this.state.loc}</p>
                                    <p>{this.state.degree} {this.state.major} {this.state.year} </p>
                                </CardContent>
                            </Card>
                            <br/>

                            {/*Experience */}
                            <Card>
                                <CardContent>
                                    <div class="row">
                                        <div class="col-md-10">

                                            <Typography color="black" gutterBottom>
                                                <b><p style={{ fontSize: '24px' }}>Work Experience</p></b>
                                            </Typography>
                                        </div>

                                    </div>
                                    <p>{this.state.title} at {this.state.cmpy_name}</p>
                                    <p>{this.state.loc}</p>
                                    <p>{this.state.start_date.substring(0, 10)} - {this.state.end_date.substring(0, 10)}</p>
                                </CardContent>
                            </Card>
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
                                    <p>{this.state.phone}</p>
                                    <p>{this.state.email}</p>
                                    </CardContent>
                                        </Card>

                        </div>
                        <div class="col-md-1"> </div>
                    </div>
                    {/* <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                <h2>{this.state.name}</h2>
                            </Typography>
                            <h3>{this.state.date}</h3>
                            <p>{this.state.city} {this.state.state} {this.state.country} </p>
                            <p>{this.state.career_obj}</p>
                            {this.state.skill}
                            {this.state.phone}
                            {this.state.email}
                            {this.state.clg}
                            {this.state.loc}
                            {this.state.degree}
                            {this.state.major}
                            {this.state.year}
                            {this.state.cgpa}
                            {this.state.cmpy_name}
                            {this.state.title}
                            {this.state.cmpyloc}
                            {this.state.start_date}
                            {this.state.end_date}
                            {this.state.work_desc}
                        </CardContent>
                    </Card> */}
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