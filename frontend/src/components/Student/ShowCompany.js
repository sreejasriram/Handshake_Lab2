import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import Jobs from './Jobs';
import StudentNavbar from './StudentNavbar';
import cookie from 'react-cookies';
import {environment} from '../../Utils/constants';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


class ShowCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            location: "",
            description: "",
            contact: "",
            dataRetrieved: false,
            redirect: false,
            profileData: [],
            jobId: props.match.params
        }
    }


    
    componentDidMount() {
        const data = {
            jobId: this.state.jobId.jobId
        }
        console.log(data)

        axios.get(environment.baseUrl+'/student/jobs_details/'+data.jobId)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                if (response.data.rows) {
                    this.setState({
                        dataRetrieved: true,
                        profileData: response.data.rows
                    });
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                }
            })
    }


    render() {
        let logincookie= null
        if(!cookie.load('student')){
            logincookie = <Redirect to= "/"/>
        }
        let navbar =  <StudentNavbar comp="jobsearch" />
        let profileData = this.state.profileData;
        console.log(profileData)
        let renderRedirect = null
      
       
           if (profileData.length>0) {
            renderRedirect =(
                    profileData.map((data, index) => {
                        return (
                            <div>
                               
                                    <div class="row">
                                        <div class="col-md-2"> </div>
                                       
                                        <div class="col-md-8">  
                                        <Card>
                                    <CardContent>                                               
                                            <div key={data.companydetails[0]._id}>
                                            <Typography color="black" gutterBottom>
                                                <b><p style={{ fontSize: '24px' }}>{data.title}</p></b>
                                            </Typography>
                                                <h3>{data.companydetails[0].name}</h3>
                                                <p>{data.companydetails[0].description}</p>
                                                <p>{data.companydetails[0].contact}</p>
                                                <p>{data.companydetails[0].location}</p>
                                            </div>
                                            </CardContent>
                                    </Card>
                                        </div>
                                       <br /><br />
                                        <div class="col-md-2"> </div>
                                     </div>
                                   
                            </div>

                   
                )
                    }))
                

        }
       
        return (
            <div>
                {logincookie}

                 {navbar}
                {renderRedirect}
            </div>
        )
    }
}
export default ShowCompany;