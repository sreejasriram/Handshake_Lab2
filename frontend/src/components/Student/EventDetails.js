
import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';

import EventApply from './EventApply';
import { Card, CardContent, Button, IconButton, InputBase } from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import EventNoteIcon from '@material-ui/icons/EventNote';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import StudentNavbar from './StudentNavbar'
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



class EventDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cmpy_id: "",
            dataRetrieved: false,
            eventData: [],
            eventId: props.match.params,
            applied: false,
            already_applied : false,
            submitted: false,
            stud_major:"",
            event_elig:""

        }
        this.ApplyEvent = this.ApplyEvent.bind(this);

    }
    ApplyEvent = (e) => {
        var headers = new Headers();
        e.preventDefault();
        // this.setState({
        //     applied: true
        // });
        const edit_data = {
            stud_id:sessionStorage.getItem('id'),
            cmpy_id: this.state.eventData[0].cmpy_id,
            event_id: this.state.eventId.eventId,
        }
        console.log(edit_data)
        axios.post(environment.baseUrl+'/company/apply_event', edit_data)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.result)
                if (response.data.result) {
                    this.setState({
                        submitted: true

                    });
                    // console.log(response.data.rows[0].title)
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                }
            })

    }

    componentDidMount() {
        console.log("did mount")
        const data = {
            id: this.state.eventId.eventId,
        }
        console.log(data)
        axios.post(environment.baseUrl+'/company/events_details', data)
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
                    cmpy_id:this.state.eventData[0].cmpy_id,
                    event_id:this.state.eventId.eventId,
                    stud_id:sessionStorage.getItem('id')
                }
                console.log(data)
                axios.post(environment.baseUrl+'/company/event_already_applied', data)
                .then(response => {
                console.log("in frontend after response");
                console.log(response.data.result)
                if (response.data.result) {
                    this.setState({
                        already_applied:true
                    });
                } else if (response.data.error) {
                    console.log("response" + response.data.error)

                }
            })
        })
        .then(response => {
            console.log("get student eligibility")
            let data = {
                cmpy_id:this.state.eventData[0].cmpy_id,
                event_id:this.state.eventId.eventId,
                id:sessionStorage.getItem('id')
            }
            console.log(data)
            axios.post(environment.baseUrl+'/student/get_student_eligibility', data)
            .then(response => {
            console.log("in frontend after response");
            console.log(response.data.rows)
            if (response.data.rows) {
               
                this.setState({
                    stud_major:response.data.rows[0],
                    event_elig:response.data.rows[1]
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
        let stud_major=this.state.stud_major.major;
        let event_elig=this.state.event_elig;
        let eligibility=false;
        let logincookie = null
        if (!cookie.load('student')) {
            logincookie = <Redirect to="/" />
        }
        let navbar = <StudentNavbar comp="events" />
        console.log(eventData)
        let display = null
        if (this.state.submitted == true) {
            display = <Redirect to='/companyevents' />

        }


        // if (this.state.applied == true) {
        //     console.log(eventData[0].cmpy_id)
        //     renderRedirect = <EventApply cmpy_id={eventData[0].cmpy_id} event_id={this.state.eventId.eventId}/>
        // }
        console.log("outside")
        console.log(this.state.already_applied)
        console.log(stud_major)
        console.log(event_elig)

        if (stud_major && event_elig)
        {
            if (event_elig.major=="all" || event_elig.major=="All"){
                console.log(event_elig)
                eligibility=true
            }
            else {
            //     event_elig((elig) => {
            //     let ret = elig.major.indexOf(stud_major) 
            //     if (ret >-1)
            //     eligibility = true
            //     else
            //     eligibility = false
            // })
          
            eligibility = event_elig.major.includes(stud_major) 
               
           
        }
        }
       


        if (this.state.already_applied == false &&   eligibility==true){
            console.log("inside")
            applied = <button onClick={this.ApplyEvent} class="btn btn-primary">Apply</button>
            }
        return (
            <div>
                {logincookie}
                {navbar}
                {/* <button onClick={this.postJobs} class="btn btn-primary">Add New Job</button> */}
                <div class="row">
                <div class="col-md-1"></div>
                    <div class="col-md-9">
                <Card>
                                <CardContent>

                {eventData.map((data, index) => {
                    return (
                        <div key={data.event_id}>
                            {/* <Link to={`/companyeventdetails/${data.event_id}`} activeClassName="active"> */}
                            <Typography color="black" gutterBottom>  <h5>{data.name}</h5></Typography>

                            {/* </Link> */}

                            <p>{data.eventDesc}</p>
                            <p> <EventNoteIcon></EventNoteIcon>{data.date.substring(0,10)} at {data.time}</p>
                            <p><LocationOnOutlinedIcon></LocationOnOutlinedIcon>{data.loc} </p>
                            <p> <CheckCircleOutlineOutlinedIcon></CheckCircleOutlineOutlinedIcon>{data.elig}</p>

                            <br /><br />
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