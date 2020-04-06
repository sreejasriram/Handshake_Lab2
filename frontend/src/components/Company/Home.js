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
import TablePagination from '@material-ui/core/TablePagination';


class Home extends Component {
    constructor(props) {
        super(props);
        let cmpny_id = sessionStorage.getItem('id');
        this.state = {
            title: "",
            posting_date: "",
            deadline: "",
            location: "",
            salary: "",
            description: "",
            category: "",
            dataRetrieved: false,
            redirect: false,
            jobData: [],
            editJob:"",
            view_applicants:false,
            companyId:cmpny_id,
            page: 0,
            rowsPerPage: 2



        }

        this.postJobs = this.postJobs.bind(this);
        this.viewApplicants = this.viewApplicants.bind(this);
    }

    postJobs = (e) => {
        var headers = new Headers();
        e.preventDefault();
        this.setState({
            redirect: true
        })
    }


    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        })
        console.log(this.state.page)
    };




    viewApplicants = (e) => {
        this.setState({
            view_applicants: true,
            editJob:e.target.value
        })
    }

    componentDidMount() {   
        const data = {
            companyId: this.state.companyId
        }
        console.log(data)
        axios.get(environment.baseUrl+'/company/getjobs/'+data.companyId)
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
                                {jobData.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((data, index) => {

                                    // {jobData.map((data, index) => {
                                        
                                        return (
                                            <div key={data._id}>
                                                <br/><br/>
                                                 <Card>
                                        <CardContent>
                                        <Typography color="black" gutterBottom>
                                                <b><h5>{data.title}                                                                                
                                                </h5></b> </Typography>

                                                <p><b>Role:</b> {data.description}</p> 
                                                <p><b>Location:</b> {data.location}</p>
                                                <p><b>Category:</b> {data.category}</p>
                                                <button onClick={this.viewApplicants} class="btn btn-primary" value={data._id}  style={{backgroundColor:'#1569E0', marginLeft:'800px', borderRadius:'15px'}} >View Applicants</button>
                                                </CardContent></Card>
                                                {/* <button onClick={this.editJobs} class="btn btn-primary"  value={data.job_id}>Edit Job</button> */}
                                            </div>

                                        )
                                    })
                                    
                                    }
                     <div class="row">
                    <div class="col-md-4"></div>
                    <div class="col-md-4">
                        <TablePagination
                            rowsPerPageOptions={[2]}
                            count={this.state.jobData.length}
                            page={this.state.page}
                            rowsPerPage={this.state.rowsPerPage}
                            onChangePage={this.handleChangePage}
                        />
                    </div>  <div class="col-md-4"></div>
                </div>

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