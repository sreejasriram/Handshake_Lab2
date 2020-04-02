import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import {Link} from 'react-router-dom';
import StudentNavbar from './StudentNavbar'
import cookie from 'react-cookies';
import { Card, CardContent, Button, IconButton, InputBase } from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import EventNoteIcon from '@material-ui/icons/EventNote';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import {environment} from '../../Utils/constants';



class ViewRegisteredEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            posting_date: "",
            deadline: "",
            location: "",
            salary: "",
            description: "",
            cat: "",
            dataRetrieved: false,
            eventData: []
           
        }
    }
 
    componentDidMount() {
        const data = {

            studentId: sessionStorage.getItem('id')

        }

        axios.get(environment.baseUrl+'/student/list_applied_events/'+data.studentId)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                if (response.data.rows) {
                    this.setState({
                        dataRetrieved: true,
                        eventData: response.data.rows
                    });
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                }
            })
    }


    render() {
        let navbar =  <StudentNavbar comp="eventregistrations" />
        let logincookie= null
        if(!cookie.load('student')){
            logincookie = <Redirect to= "/"/>
        }
        let eventData = this.state.eventData;
        console.log(eventData)
        return (
            <div>
                {logincookie}

                {navbar}
                <div class="row">
                <div class="col-md-2"></div>
                    <div class="col-md-8">

                {eventData.map((data, index) => {
                    return (
                        <div key={data.event_id}>
                           <Card>
                                <CardContent>
                                <Typography color="black" gutterBottom> <h5>{data.name}</h5></Typography>
                            <p> {data.description}</p>
                            <p> <EventNoteIcon></EventNoteIcon> {data.date.substring(0,10)}</p>
                            <p><LocationOnOutlinedIcon></LocationOnOutlinedIcon>{data.location} </p>
                            </CardContent>
                            </Card>
                            <br /><br />
                        </div>
                    )
                })}</div>
                  <div class="col-md-2"></div>
                  </div>
            </div>

        )
    }
}
export default ViewRegisteredEvents;