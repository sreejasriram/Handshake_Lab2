
import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import JobDetails from './JobDetails';
import cookie from 'react-cookies';

import { makeStyles } from '@material-ui/core/styles';

import { Card, CardContent, Button } from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import StudentNavbar from './StudentNavbar';
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



class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            postingDate: "",
            deadline: "",
            loc: "",
            salary: "",
            desc: "",
            cat: "",
            dataRetrieved: false,
            //redirect: false,
            jobData: [],
            namesearch: "",
            locsearch: "",
            jobfilter: [],
            jobindex: 0,
          
            jobid: ""

        }


        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.showJob = this.showJob.bind(this);
        this.jobFliter = this.jobFilter.bind(this);
        this.showJobDetails = this.showJobDetails.bind(this)

    }
    inputChangeHandler = (e) => {
        const value = e.target.value
        this.setState({
            [e.target.name]: value
        })
        console.log(this.state.namesearch)
    }

    showJob = (e) => {
        console.log(e)
        this.setState({
            jobindex: e
        })
    }
    showJobDetails = (e) => {
        console.log(e)
        this.setState({
          
            jobid: e

        })
    }
    jobFilter = (e) => {
        let jobfilters = this.state.jobfilter
        let jobtypeindex = jobfilters.indexOf(e)
        if (jobtypeindex <= -1) {
            jobfilters.push(e)
            this.setState({
                jobfilter: jobfilters
            })
            console.log(this.state.jobfilter)

        } else {
            jobfilters.splice(jobtypeindex, 1)
            this.setState({
                jobfilter: jobfilters
            })
            console.log("aa")

            console.log(this.state.jobfilter)

        }
    }

    componentDidMount() {
        //  const jobId = props.match.params
        axios.post(environment.baseUrl+'/company/all_jobs_retrieve')
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                if (response.data.rows) {
                    this.setState({
                        dataRetrieved: true,
                        jobData: response.data.rows
                    });
                } else if (response.data.error) {
                    console.log("response" + response.data.error)

                }


            })
    }


    render() {
     
        let jobData = this.state.jobData;
        console.log(jobData)

        //
        let jobs = null;
        let detailedjob = null;
        let jobdetailed = null;
        let jobfilter = [];
        let namesearch = this.state.namesearch;
        let locsearch = this.state.locsearch;
        let renderDetails = null
        let logincookie= null
        if(!cookie.load('student')){
            logincookie = <Redirect to= "/"/>
        }
        let navbar =  <StudentNavbar comp="jobsearch" />
       
            console.log("details called with jobid")
            console.log(this.state.jobid)
            if (this.state.jobid == ""){
                renderDetails = <JobDetails jobId="1" />
            }else{
            renderDetails = <JobDetails jobId={this.state.jobid} />}
      
        if (this.state.jobData) {
            // joblist = (<JobList studentId={this.state.studentId} jobs={this.state.joblist} />)

            jobfilter = this.state.jobfilter
            // console.log(jobfilter)
            // console.log(joblist)
            if (namesearch.length > 0) {
                jobData = jobData.filter((job) => {
                    return (job.title.indexOf(namesearch) > -1 || job.name.indexOf(namesearch) > -1)
                })
            }
            if (locsearch.length > 0) {
                jobData = jobData.filter((job) => {
                    return job.loc.indexOf(locsearch) > -1
                })
            }
            console.log(jobData)
            if (jobfilter.length > 0) {
                console.log("aa")
                jobData = jobData.filter((job) => {
                    return jobfilter.indexOf(job.cat) > -1
                })
                console.log(jobData)

            }
        }

        //


        return (
           
            <div  style={{backgroundColor:"#F7F7F7"}}>
                {navbar}
                {logincookie}
                 <div class="row">
                 <div class="col-md-1"></div>
                    <div class="col-md-10">
                <Card>
                    <CardContent>
                        <div style={{ marginBottom: '13px' }}>
                            <div style={{ width: "50%", float: "left" }}><input type="text" name="namesearch" id="namesearch" style={{ width: "80%", }} placeholder="Search by Job titles, employers, or keywords" onChange={this.inputChangeHandler} /></div>
                            <div style={{ width: "50%", float: "right" }}>
                                <input type="text" name="locsearch" id="locsearch" style={{ width: "80%" }} placeholder="Search by Location" onChange={this.inputChangeHandler} />


                            </div></div> <br /><br />
                        <div style={{ marginTop: '13px' }}>
                            <Button variant="outlined" color="primary" href="#outlined-buttons" style={{ borderRadius: "15px" }} onClick={() => this.jobFliter("Full-Time")}>Full-Time Job</Button> &nbsp;
                            <Button variant="outlined" color="primary" href="#outlined-buttons" style={{ borderRadius: "15px" }} onClick={() => this.jobFliter("Part-Time")}>Part-Time</Button>&nbsp;
                            <Button variant="outlined" color="primary" href="#outlined-buttons" style={{ borderRadius: "15px" }} onClick={() => this.jobFliter("Internship")}>Internship</Button>&nbsp;
                            <Button variant="outlined" color="primary" href="#outlined-buttons" style={{ borderRadius: "15px" }} onClick={() => this.jobFliter("On-Campus")}>On-Campus</Button>
                        </div>
                    </CardContent>
                </Card></div>
                <div class="col-md-1"></div>
                </div>

                <br/><br/>

                {/* <button onClick={this.postJobs} class="btn btn-primary">Add New Job</button> */}
                {/* {renderRedirect} */}
                <div class="row">
                <div class="col-md-1"></div>
                    <div class="col-md-3">
                        <Card>
                            <CardContent>
                                {jobData.map((data, index) => {
                                    return (
                                        <div key={data.job_id}>
                                            {/* <CreateOutlinedIcon onClick={this.editProfile} style={{alignContent:'right'}}></CreateOutlinedIcon> */}
                                            <Typography color="textSecondary" gutterBottom>
                                                {/* <Link to={`/jobdetails/${data.job_id}`} activeClassName="active"> */}
                                                <Link onClick={() => this.showJobDetails(data.job_id)} activeClassName="active">
                                                    <h5>{data.title}</h5>
                                                    <p> {data.name},{data.loc}</p>
                                                </Link> </Typography>
                                        </div>
                                    )
                                })}
                        </CardContent> </Card></div>
                        <div class="col-md-7">
                        <Card>
                            <CardContent>
                            {renderDetails}
                            </CardContent>
                         </Card>

                        </div>
                        <div class="col-md-1"> </div>

                    </div></div>

                )
            }
        }
export default Jobs;