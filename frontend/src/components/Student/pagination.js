import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import Jobs from './Jobs';
import StudentNavbar from './StudentNavbar';
import cookie from 'react-cookies';
import {environment} from '../../Utils/constants';


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
                                
                            <div key={data.companydetails[0]._id}>
                                <h3>{data.title}</h3>
                                <h3>{data.companydetails[0].name}</h3>
                                <p>{data.companydetails[0].description}</p>
                                <p>{data.companydetails[0].contact}</p>
                                <p>{data.companydetails[0].location}</p><br /><br />
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