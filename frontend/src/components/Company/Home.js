import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import Jobs from './Jobs';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
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
class Home extends Component {
    constructor(props) {
        super(props);
        let cmpny_id = sessionStorage.getItem('id');
        this.state = {
            title: "",
            postingDate: "",
            deadline: "",
            loc: "",
            salary: "",
            desc: "",
            cat: "",
            // id: this.props.location.state.id,
            dataRetrieved: false,
            redirect: false,
            jobData: [],
            // edit:false,
             editJob:"",
            view_applicants:false,
            id:cmpny_id



        }
      
       
        console.log(cmpny_id)
        console.log(this.state.id)

        this.postJobs = this.postJobs.bind(this);
        // this.editJobs = this.editJobs.bind(this);
        this.viewApplicants = this.viewApplicants.bind(this);
    }



    //submit Login handler to send a request to the node backend
    postJobs = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        this.setState({
            redirect: true

        })
    }
//     editJobs = (e) => {
//         var headers = new Headers();
//         //prevent page from refresh
// console.log(e.target.value);
//         this.setState({
//             edit: true,
//             editJob:e.target.value

//         })
//     }
    viewApplicants = (e) => {
      
        this.setState({
            view_applicants: true,
            editJob:e.target.value
        })
    }

    componentDidMount() {
        
        const data = {
           // id: cmpny_id
           id: this.state.id
        }
        console.log(data)
        axios.post(environment.baseUrl+'/company/company_jobs_retrieve', data)
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
        let renderRedirect = null;
        if (this.state.redirect === true) {
            renderRedirect = <Redirect to='/jobs' />
        }
        if (this.state.view_applicants === true) {
            renderRedirect = <Redirect to={`/ViewApplicants/${this.state.editJob}`}/>
        }
        
        // if (this.state.edit === true) {
        //     renderRedirect = <Redirect to={`/editJobs/${this.state.editJob}`} />
        // }
        let jobData = this.state.jobData;
        console.log(jobData)
        return (
            <div>
                <div class="container">
                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <h2>Job Postings </h2>

                            </div>
                            <button onClick={this.postJobs} class="btn btn-primary">Add New Job</button>
                            <div>
                                {renderRedirect}
                            </div>
                           
                                <div>
                                    {jobData.map((data, index) => {
                                        
                                        return (
                                            <div key={data.job_id}>
                                                <br/><br/>
                                                 <Card>
                                        <CardContent>
                                        <Typography color="black" gutterBottom>
                                                <b><h5>{data.title}                                                                                
                                                </h5></b> </Typography>

                                                <p><b>Role:</b> {data.jobDesc}</p> 
                                                <p><b>Location:</b> {data.loc}</p>
                                                <p><b>Category:</b> {data.cat}</p>
                                                <button onClick={this.viewApplicants} class="btn btn-primary" value={data.job_id}  style={{backgroundColor:'#1569E0', marginLeft:'800px', borderRadius:'15px'}} >View Applicants</button>
                                                </CardContent></Card>
                                                {/* <button onClick={this.editJobs} class="btn btn-primary"  value={data.job_id}>Edit Job</button> */}
                                            </div>

//////////////
                                        // <div style={{padding:'10px 0px 10px 50px'}}>
                                        // <div className="row App-align">
                                        //     <div className="col-md-9" style={{ fontSize: "23px", color: "#1569E0",marginLeft:"-10px" }}>{job.title}</div>
                                        //     <div className="col-md-3"><button class="btn btn-primary" style={{backgroundColor:'#1569E0', marginLeft:'15px', borderRadius:'15px'}} value={job.jobId} onClick={this.viewApplicants}>View Applicants</button></div>
                                        // </div>
                                        // <div style={{ fontSize: "13px" }}><span class="glyphicon glyphicon-usd" style={{ color: "#1569E0" }}></span> {job.salary+" per hour"}</div>
                                        // <div style={{ fontSize: "13px" }}><span class="glyphicon glyphicon-map-marker" style={{ color: "#1569E0" }}></span> {job.location}</div>
                                        // <div style={{ fontSize: "13px" }}><span class="glyphicon glyphicon-calendar" style={{ color: "#1569E0" }}></span> Ends on {job.deadline.substring(0,10)}</div>
                                        // </div>
//////

                                        )
                                    })}
                                </div>
                          
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
//export Login Component
export default Home;