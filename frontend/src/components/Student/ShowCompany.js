//company_profile

import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import Jobs from './Jobs';
import StudentNavbar from './StudentNavbar';
import cookie from 'react-cookies';
import {environment} from '../../Utils/constants';




//Define a Login Component
class ShowCompany extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            name: "",
            loc: "",
            desc: "",
            contact: "",
            // id: this.props.location.state.id,
            dataRetrieved: false,
            redirect: false,
            profileData: [],
            jobId: props.match.params


        }
    }


    
    componentDidMount() {
        let cmpny_id = sessionStorage.getItem('id');
        const data = {
            id: this.state.jobId.jobId
        }
        console.log(data)

        axios.post(environment.baseUrl+'/company/jobs_details', data)
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
                                
                            <div key={data.cmpy_id}>
                                <h3>{data.title}</h3>
                                <h3>{data.name}</h3>
                                <p>{data.cmpyDesc}</p>
                                <p>{data.contact}</p>
                                <p>{data.loc}</p><br /><br />
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
//export Login Component
export default ShowCompany;