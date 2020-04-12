import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Card, CardContent, Button, IconButton, InputBase } from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import EventNoteIcon from '@material-ui/icons/EventNote';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import StudentNavbar from './StudentNavbar'
import { environment } from '../../Utils/constants';
import emptyPic from '../../images/empty-profile-picture.png';
import { Avatar } from '@material-ui/core';


class EventDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cmpy_id: "",
            dataRetrieved: false,
            eventData: [],
            eventId: props.match.params,
            applied: false,
            already_applied: false,
            submitted: false,
            stud_major: "",
            event_elig: "",
            emptyprofilepic: emptyPic


        }
        this.ApplyEvent = this.ApplyEvent.bind(this);
    }
    ApplyEvent = (e) => {
        var headers = new Headers();
        e.preventDefault();
        const edit_data = {
            stud_id: sessionStorage.getItem('id'),
            // cmpy_id: this.state.eventData[0].cmpy_id,
            event_id: this.state.eventId.eventId,
        }
        console.log(edit_data)
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        axios.post(environment.baseUrl + '/student/apply_event', edit_data)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.result)
                if (response.data.result) {
                    this.setState({
                        submitted: true

                    });
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                }
            })

    }

    componentDidMount() {
        console.log("did mount")
        const data = {
            eventId: this.state.eventId.eventId,
        }
        console.log(data)
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        axios.get(environment.baseUrl + '/student/events_details/' + data.eventId)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                if (response.data.rows) {
                    this.setState({
                        dataRetrieved: true,
                        eventData: response.data.rows,
                        cmpy_id: response.data.rows.cmpy_id
                    });
                } else if (response.data.error) {
                    console.log("response" + response.data.error)

                }
            })
            .then(response => {
                console.log("checking if event already applied")
                let data = {
                    // cmpy_id: this.state.eventData[0].cmpy_id,
                    eventId: this.state.eventId.eventId,
                    studentId: sessionStorage.getItem('id')
                }
                console.log(data)
                axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

                axios.get(environment.baseUrl + '/company/event_already_applied/' + data.eventId + "/" + data.studentId)
                    .then(response => {
                        console.log("in frontend after response");
                        console.log(response.data.result)
                        if (response.data.result) {
                            this.setState({
                                already_applied: true
                            });
                        } else if (response.data.error) {
                            console.log("response" + response.data.error)

                        }
                    })
            })
            .then(response => {
                console.log("get student eligibility")
                let data = {
                    // cmpy_id: this.state.eventData[0].cmpy_id,
                    eventId: this.state.eventId.eventId,
                    studentId: sessionStorage.getItem('id')
                }
                console.log(data)
                axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

                axios.get(environment.baseUrl + '/company/get_student_eligibility/' + data.eventId + "/" + data.studentId)
                    .then(response => {
                        console.log("in frontend after response");
                        console.log(response.data.rows)
                        if (response.data.rows) {
                            this.setState({
                                stud_major: response.data.rows,
                                // event_elig: response.data.rows[1]
                            });
                        } else if (response.data.error) {
                            console.log("response" + response.data.error)

                        }
                    })
            })
    }


    render() {
        let renderRedirect = null;
        let applied = null
        let eventData = this.state.eventData;
        let stud_major
        console.log(this.state.stud_major)
        if (this.state.stud_major.length)
            stud_major = this.state.stud_major[0].education[0].major;
        // let event_elig = this.state.event_elig;
        let event_elig
        if (eventData.length)
            event_elig = eventData[0].eligibility;
        let eligibility = false;
        let logincookie = null
        console.log(this.state.cmpy_id)
        if (!cookie.load('student')) {
            logincookie = <Redirect to="/" />
        }
        let navbar = <StudentNavbar comp="events" />
        console.log(eventData)
        let display = null
        if (this.state.submitted == true) {
            display = <Redirect to='/companyevents' />

        }
        console.log("outside")
        console.log(this.state.already_applied)
        console.log(stud_major)
        console.log(event_elig)

        // if (stud_major && event_elig) {
        //     if (event_elig.major == "all" || event_elig.major == "All") {
        //         console.log(event_elig)
        //         eligibility = true
        //     }
        //     else {
        //         eligibility = event_elig.major.includes(stud_major)
        //     }
        // }

        if (stud_major && event_elig) {
            if (event_elig == "all" || event_elig == "All") {
                console.log(event_elig)
                eligibility = true
            }
            else {
                eligibility = event_elig.includes(stud_major)
                console.log(eligibility)
            }
        }


        if (this.state.already_applied == false && eligibility == true) {
            console.log("inside")
            applied = <button onClick={this.ApplyEvent} class="btn btn-primary">Apply</button>
        }
        return (
            <div>
                {logincookie}
                {navbar}
                <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-9">
                        <Card>
                            <CardContent>

                                {eventData.map((data, index) => {
                                    return (
                                        <div key={data._id}>
                                            <div class="row">
                                                <div class="col-md-1" style={{paddingRight:'0px'}}>
                                                    <Avatar src={data.companydetails[0].image ? data.companydetails[0].image : this.state.emptyprofilepic} style={{ width: '36px', height: '36px', borderRadius: '50%', textAlign: 'center'}}></Avatar>
                                                </div>
                                                <div class="col-md-4" style={{padding:'0px'}}>
                                                <Typography color="black" gutterBottom>  <h5>{data.name?data.name:""}</h5></Typography>
                                                </div>
                                            </div>
                                            <p>{data.description?data.description:""}</p>
                                            {data.date?(<div><EventNoteIcon style={{ color: "#1569E0" }}></EventNoteIcon> {data.date.substring(0, 10)} at {data.time}</div>):<div></div>} 

                                            {/* <p> <EventNoteIcon></EventNoteIcon>{data.date.substring(0, 10)} at {data.time}</p> */}
                                            {data.location?(<div><LocationOnOutlinedIcon style={{ color: "#1569E0" }}></LocationOnOutlinedIcon> {data.location}</div>):<div></div>} 

                                            {/* <p><LocationOnOutlinedIcon></LocationOnOutlinedIcon>{data.location} </p> */}
                                            {data.eligibility?(<div><CheckCircleOutlineOutlinedIcon style={{ color: "#1569E0" }}></CheckCircleOutlineOutlinedIcon> {data.eligibility}</div>):<div></div>} 

                                            {/* <p> <CheckCircleOutlineOutlinedIcon></CheckCircleOutlineOutlinedIcon>{data.eligibility}</p> */}
                                            <br />
                                            {applied}
                                        </div>
                                    )
                                })}<br /> </CardContent>
                        </Card></div>
                    <div class="col-md-2"></div>
                </div>

                {/* {renderRedirect} */}
                <div> {display}</div>

            </div>

        )
    }
}
export default EventDetails;