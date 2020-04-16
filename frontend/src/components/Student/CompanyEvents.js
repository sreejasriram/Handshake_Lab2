import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Card, CardContent, Button, IconButton, InputBase } from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import EventNoteIcon from '@material-ui/icons/EventNote';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import StudentNavbar from './StudentNavbar'
import { environment } from '../../Utils/constants';
import TablePagination from '@material-ui/core/TablePagination';

import { connect } from "react-redux";
import { fetchEvents } from "../../redux/actions/index";


class CompanyEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataRetrieved: false,
            eventData: [],
            view: false,
            eventindex: 0,
            namesearch: "",
            page: 0,
            rowsPerPage: 2
        }
        this.viewRegisteredEvents = this.viewRegisteredEvents.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.showEvent = this.showEvent.bind(this);
    }
    viewRegisteredEvents = (e) => {
        var headers = new Headers();
        e.preventDefault();
        this.setState({
            view: true
        });

    }


    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        })
        console.log(this.state.page)
    };


    inputChangeHandler = (e) => {
        const value = e.target.value
        this.setState({
            [e.target.name]: value
        })
        console.log(e.target.value)
    }

    showEvent = (e) => {
        console.log(e)
        this.setState({
            eventindex: e
        })
    }


    componentDidMount() {
        this.props.fetchEvents();
        
        // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        // axios.get(environment.baseUrl + '/student/all_events_retrieve')
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
        let navbar = <StudentNavbar comp="events" />
        // let eventData = this.state.eventData;
        let eventData = this.props.eventData;

        let renderRedirect = null
        let logincookie = null
        if (!cookie.load('student')) {
            logincookie = <Redirect to="/" />
        }
        if (this.state.view === true) {
            renderRedirect = <Redirect to='/viewRegisteredEvents' />
        }
        let namesearch = this.state.namesearch;
        console.log(namesearch)
        if (this.state.eventData) {
            if (namesearch.length > 0) {
                eventData = eventData.filter((event) => {
                    return (event.name.indexOf(namesearch) > -1)
                })
            }
        }

        console.log(eventData)
        return (
            <div>
                {logincookie}
                {navbar}
                {renderRedirect}
                <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-9">
                        <Card style={{ marginRight: '16px' }}>
                            <CardContent>
                                Filter:
                                <div style={{ marginBottom: '13px' }}>
                                    <div style={{ width: "50%", float: "left" }}><input type="text" name="namesearch" id="namesearch" style={{ width: "80%", }} placeholder="Search for event name" onChange={this.inputChangeHandler} /></div></div>
                            </CardContent>
                        </Card><div class="col-md-2"> </div>
                    </div>
                </div>

                <br />

                <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-9">

                        {eventData.length?eventData.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((data, index) => {
                            // {eventData.map((data, index) => {
                            return (
                                <div key={data._id}>
                                    <Card>
                                        <CardContent>
                                            <Typography color="black" gutterBottom>
                                                <Link to={`/eventdetails/${data._id}`} activeClassName="active">
                                                    <h5>{data.name?data.name:""}</h5>

                                                </Link>
                                                <p> {data.description?data.description:""} </p>
                                                {/* <p> <EventNoteIcon fontSize="medium" style={{ color: "#1569E0" }}></EventNoteIcon> {data.date.substring(0, 10)} */}
                                                {data.date.substring(0, 10)?(<div><EventNoteIcon fontSize="medium" style={{ color: "#1569E0" }}></EventNoteIcon>{data.date.substring(0, 10)}</div>):<div></div>} 
                                                {data.location?(<div><LocationOnOutlinedIcon fontSize="medium" style={{ color: "#1569E0" }}></LocationOnOutlinedIcon> {data.location}</div>):<div></div>} 

                                                    {/* <LocationOnOutlinedIcon fontSize="medium"></LocationOnOutlinedIcon> {data.location} */}

                                                {/* </p> */}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <br /><br />
                                </div>
                            )
                        }
                        ):""}</div>
                    <div class="col-md-2"></div>
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
            </div>

        )
    }
}
// export default CompanyEvents;
const mapStateToProps = state => {
    console.log(state.allEvents)
    
    return {

        eventData:state.allEvents

    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
      fetchEvents: payload => dispatch(fetchEvents(payload))
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CompanyEvents);