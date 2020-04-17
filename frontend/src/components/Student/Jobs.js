
import React, { Component } from 'react';
import '../../App.css';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import JobDetails from './JobDetails';
import cookie from 'react-cookies';
import { Card, CardContent, Button } from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import StudentNavbar from './StudentNavbar';
import TablePagination from '@material-ui/core/TablePagination';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Dropdown } from 'react-bootstrap'

import { connect } from "react-redux";
import { fetchJobs } from "../../redux/actions/index";

class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataRetrieved: false,
            jobData: [],
            namesearch: "",
            locsearch: "",
            jobfilter: [],
            jobindex: 0,
            jobid: "",
            page: 0,
            rowsPerPage: 4
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

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        })
        console.log(this.state.page)
    };

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


    /////////////////////////////////
    sortbyloc() {
        let jobData = this.props.jobData
        let compare = (a,b) =>{
            let comparison = 0
            if (a.location > b.location) {
                comparison = 1;
              } else if (a.location < b.location) {
                comparison = -1;
              }
              return comparison;
        }
        if (jobData.length)
            jobData.sort(compare);
        this.setState({
            jobData:jobData
        })
    }
    sortbyPostingDate() {
        let jobData = this.props.jobData
        let compare = (a,b) =>{
            let comparison = 0
            if (a.posting_date > b.posting_date) {
                comparison = 1;
              } else if (a.posting_date < b.posting_date) {
                comparison = -1;
              }
              return comparison;
        }
        if (jobData.length)
            jobData.sort(compare);
        this.setState({
            jobData:jobData
        })
    }
    sortbyPostingDatedesc() {
        let jobData = this.props.jobData
        let compare = (a,b) =>{
            let comparison = 0
            if (a.posting_date < b.posting_date) {
                comparison = 1;
              } else if (a.posting_date > b.posting_date) {
                comparison = -1;
              }
              return comparison;
        }
        if (jobData.length)
            jobData.sort(compare);
        this.setState({
            jobData:jobData
        })
    }
    sortbyDeadline() {
        let jobData = this.props.jobData
        let compare = (a,b) =>{
            let comparison = 0
            if (a.deadline > b.deadline) {
                comparison = 1;
              } else if (a.deadline < b.deadline) {
                comparison = -1;
              }
              return comparison;
        }
        if (jobData.length)
            jobData.sort(compare);
        this.setState({
            jobData:jobData
        })
    }
    sortbyDeadlinedesc() {
        console.log("sortbyDeadlinedesc")
        let jobData = this.props.jobData
        let compare = (a,b) =>{
            let comparison = 0
            if (a.deadline < b.deadline) {
                comparison = 1;
              } else if (a.deadline > b.deadline) {
                comparison = -1;
              }
              return comparison;
        }
        if (jobData.length)
            jobData.sort(compare);
        this.setState({
            jobData:jobData
        })
    }



    ////////////////////////////////

    componentDidMount() {
        this.props.fetchJobs();

        // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        // axios.get(environment.baseUrl+'/student/all_jobs_retrieve')
        //     .then(response => {
        //         console.log("in frontend after response");
        //         console.log(response.data.rows)
        //         if (response.data.rows) {
        //             this.setState({
        //                 dataRetrieved: true,
        //                 jobData: response.data.rows
        //             });
        //         } else if (response.data.error) {
        //             console.log("response" + response.data.error)
        //         }
        //     })
    }


    render() {
     
        let jobData = this.props.jobData;
        console.log(jobData)
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
            renderDetails = <JobDetails jobId={this.state.jobid} />
      
        if (this.props.jobData.length) {
            jobfilter = this.state.jobfilter
            console.log(jobfilter)
            if (namesearch.length > 0) {
                jobData = jobData.filter((job) => {
                    console.log(job)
                    return (job.title.indexOf(namesearch) > -1 || job.companydetails[0].name.indexOf(namesearch) > -1)
                })
            }
            if (locsearch.length > 0) {
                jobData = jobData.filter((job) => {
                    return job.location.indexOf(locsearch) > -1
                })
            }
            console.log(jobData)
            if (jobfilter.length > 0) {
                console.log("aa")
                jobData = jobData.filter((job) => {
                    return jobfilter.indexOf(job.category) > -1
                })
                console.log(jobData)

            }
        }

        


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
                <div class="row">
                <div class="col-md-1"></div>
                    <div class="col-md-3">
                        <Card>
                            <CardContent>

                                {/* //////////////////////// */}

                                <div class='row' style={{width:'315px'}}>
                                <div class='col-md-4' style={{ position:'relative', top:'5px'}}>Jobs</div>
                                <div class="col-md-4"></div>
                                <div class="col-md-4" style={{width:'50px'}}>
                                        <DropdownButton  variant="secondary" size="sm" title="Sort By" style={{width:'50px'}}>
                                            <div style={{width:'170px'}}>
                                            <Dropdown.Item onClick={()=>{this.sortbyloc()}} style={{paddingLeft:'5px', color:'black'}}>Location</Dropdown.Item><br />
                                            <Dropdown.Item onClick={()=>{this.sortbyPostingDate()}} style={{paddingLeft:'5px', color:'black'}}>Posting Date Ascending</Dropdown.Item><br />
                                            <Dropdown.Item onClick={()=>{this.sortbyPostingDatedesc()}} style={{paddingLeft:'5px', color:'black'}}>Posting Date Descending</Dropdown.Item><br />
                                            <Dropdown.Item onClick={()=>{this.sortbyDeadline()}} style={{paddingLeft:'5px', color:'black'}}>Deadline Ascending</Dropdown.Item><br />
                                            <Dropdown.Item onClick={()=>{this.sortbyDeadlinedesc()}} style={{paddingLeft:'5px', color:'black'}}>Deadline Descending</Dropdown.Item><br />
                                            </div>
                                        </DropdownButton>
                                </div>
                            </div>



                            {jobData.length?jobData.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((data, index) => {

                                // {jobData.map((data, index) => {
                                    return (
                                        <div key={data._id}>
                                            <Typography color="textSecondary" gutterBottom>
                                                <Link onClick={() => this.showJobDetails(data._id)} activeClassName="active">
                                                    <h5>{data.title}</h5>
                                                    <p> {data.companydetails[0].name},{data.location}</p>
                                                </Link> </Typography>
                                                <hr/>
                                        </div>
                                    )
                                }):""}

                <div class="row">
                        {/* <div class="col-md-4"></div> */}
                        {/* <div class="col-md-4"> */}
                            <TablePagination
                                rowsPerPageOptions={[4]}
                                count={this.props.jobData.length}
                                page={this.state.page}
                                rowsPerPage={this.state.rowsPerPage}
                                onChangePage={this.handleChangePage}
                            />
                        {/* </div>   */}
                        {/* <div class="col-md-4"></div> */}
                    </div>
                        </CardContent> </Card>
                        
                       

                        </div>
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
// export default Jobs;
const mapStateToProps = state => {
    console.log(state.allJobs)
    
    return {

        jobData:state.allJobs

    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
      fetchJobs: payload => dispatch(fetchJobs(payload))
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Jobs);