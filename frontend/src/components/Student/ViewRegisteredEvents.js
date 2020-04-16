import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import StudentNavbar from './StudentNavbar'
import cookie from 'react-cookies';
import { Card, CardContent } from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import EventNoteIcon from '@material-ui/icons/EventNote';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { environment } from '../../Utils/constants';
import TablePagination from '@material-ui/core/TablePagination';
import emptyPic from '../../images/empty-profile-picture.png';
import { Avatar } from '@material-ui/core';

import { connect } from "react-redux";
import { fetchRegisteredEvents } from "../../redux/actions/index";


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
            eventData: [],
            page: 0,
            rowsPerPage: 2,
            emptyprofilepic: emptyPic


        }
    }


    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        })
        console.log(this.state.page)
    };

    componentDidMount() {
        this.props.fetchRegisteredEvents();

        const data = {

            studentId: sessionStorage.getItem('id')

        }
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        // axios.get(environment.baseUrl + '/student/list_applied_events/' + data.studentId)
        //     .then(response => {
        //         console.log("in frontend after response");
        //         console.log(response.data.rows)
        //         if (response.data.rows) {
        //             this.setState({
        //                 dataRetrieved: true,
        //                 eventData: response.data.rows
        //             });
        //         } else if (response.data.error) {
        //             console.log("response" + response.data.error)
        //         }
        //     })
    }



    render() {
        let navbar = <StudentNavbar comp="eventregistrations" />
        let logincookie = null
        if (!cookie.load('student')) {
            logincookie = <Redirect to="/" />
        }
        // let eventData = this.state.eventData;
        let eventData = this.props.eventData;

        console.log(eventData)
        return (
            <div>
                {logincookie}

                {navbar}
                <div class="row">
                    <div class="col-md-2"></div>
                    <div class="col-md-8">
                        {eventData.length?eventData.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((data, index) => {
                            return (
                                <div key={data.event_id}>
                                    <Card>
                                        <CardContent>
                                            <div class="row">
                                                <div class="col-md-1" style={{ paddingRight: '0px' }}>
                                                    <Avatar src={data.image ? data.image : this.state.emptyprofilepic} style={{ width: '36px', height: '36px', borderRadius: '50%', textAlign: 'center' }}></Avatar>
                                                </div>
                                                <div class="col-md-4" style={{ padding: '0px' }}>
                                                <Typography color="black" gutterBottom> <h5>{data.name?data.name:""}</h5></Typography>
                                                </div>
                                            </div>
                                            <p> {data.description?data.description:""}</p>
                                            <div class="row">
                                                <div class="col-md-2" >
                                                {data.location?(<div><LocationOnOutlinedIcon style={{ color: "#1569E0" }}></LocationOnOutlinedIcon> {data.location}</div>):<div></div>} 
                                                </div> <div class="col-md-2" >
                                                {data.date.substring(0,10)?(<div><EventNoteIcon style={{ color: "#1569E0" }}></EventNoteIcon> {data.date.substring(0, 10)}</div>):<div></div>} 
                                                </div> 
                                            </div>
                                            {/* <p> <EventNoteIcon></EventNoteIcon> {data.date.substring(0, 10)}</p>
                                            <p><LocationOnOutlinedIcon></LocationOnOutlinedIcon>{data.location} </p> */}
                                        </CardContent>
                                    </Card>
                                    <br /><br />
                                </div>

                            )
                        }):""}


                    </div>
                    <div class="row">
                        <div class="col-md-4"></div>
                        <div class="col-md-4">
                            <TablePagination
                                rowsPerPageOptions={[2]}
                                count={this.props.eventData.length}
                                page={this.state.page}
                                rowsPerPage={this.state.rowsPerPage}
                                onChangePage={this.handleChangePage}
                            />
                        </div>  <div class="col-md-4"></div>
                    </div>
                    <div class="col-md-2"></div>
                </div>
            </div>

        )
    }
}
// export default ViewRegisteredEvents;
const mapStateToProps = state => {
    console.log(state.registeredEvents)
    
    return {

        eventData:state.registeredEvents

    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
      fetchRegisteredEvents: payload => dispatch(fetchRegisteredEvents(payload))
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ViewRegisteredEvents);