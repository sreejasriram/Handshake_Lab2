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
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import {environment} from '../../Utils/constants';

class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            time: "",
            date: "",
            location: "",
            eligibility: "",
            dataRetrieved: false,
            redirect: false,
            eventData: [],
            editEvent: "",
            view_applicants: false

        }
        this.postEvents = this.postEvents.bind(this);
        this.viewApplicants = this.viewApplicants.bind(this);

    }

    postEvents = (e) => {
        var headers = new Headers();
        e.preventDefault();
        this.setState({
            redirect: true

        })
    }

    viewApplicants = (e) => {
        this.setState({
            view_applicants: true,
            editEvent: e.target.value
        })
    }
    componentDidMount() {
        let cmpny_id = sessionStorage.getItem('id');
        const data = {
            companyId: cmpny_id
        }

        axios.get(environment.baseUrl+'/company/getevents/'+data.companyId)//company_events_retrieve
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
        let renderRedirect = null;
        if (this.state.redirect === true) {
            renderRedirect = <Redirect to='/postEvents' />
        }
        if (this.state.view_applicants === true) {
            renderRedirect = <Redirect to={`/ViewEventApplicants/${this.state.editEvent}`} />
        }

        let eventData = this.state.eventData;
        console.log(eventData)
        return (
            <div>
                <button onClick={this.postEvents} class="btn btn-primary" style={{ backgroundColor: '#1569E0', marginLeft: '15px', borderRadius: '15px' }}>Add New Event</button>
                <div>
                    {renderRedirect}
                </div>

                <div>
                <div class="row">
                <div class="col-md-1"> </div>
                    <div class="col-md-10"> 
                    {eventData.map((data, index) => {
                        return (
                            <div key={data._id}>
                                <br /><br />
                                <Card>
                                    <CardContent>
                                        <Typography color="black" gutterBottom>
                                            <h3>{data.name}</h3></Typography>
                                        <p>{data.description}</p>
                                        <p><b>Time: </b>{data.date.substring(0, 10)} at {data.time}</p>
                                        <p><b>Location:</b> {data.location}</p><br /><br />
                                        <button onClick={this.viewApplicants} class="btn btn-primary" value={data.event_id} style={{ backgroundColor: '#1569E0', marginLeft: '800px', borderRadius: '15px' }}>View Applicants</button>
                                    </CardContent></Card>
                            </div>
                        )
                    })}</div>   
                    <div class="col-md-1"> </div>
                </div>
                </div>
            </div>
        )
    }
}
export default Events;