import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { Card, CardContent} from '@material-ui/core/';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import StudentNavbar from './StudentNavbar'
import {environment} from '../../Utils/constants';
import TablePagination from '@material-ui/core/TablePagination';
import emptyPic from '../../images/empty-profile-picture.png';
import {Avatar} from '@material-ui/core';


class Applications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataRetrieved: false,
            jobData: [],
            status:"",
            page: 0,
            rowsPerPage: 2,
            emptyprofilepic:emptyPic

           
        }
        this.statusFilter=this.statusFilter.bind(this);
    }
    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        })
        console.log(this.state.page)
    };
    statusFilter(e){
        console.log(e)
        this.setState({
            status:e.target.value
        })
    }
    componentDidMount() {
        const data = {
            studentId: sessionStorage.getItem('id')
        }
        console.log("before axios")
        axios.get(environment.baseUrl+'/student/list_applied_jobs/'+data.studentId)
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
        let logincookie= null
        if(!cookie.load('student')){
            logincookie = <Redirect to= "/"/>
        }
        let jobData = this.state.jobData;
        console.log(jobData)
        let navbar =  <StudentNavbar comp="jobapplications" />
        
        if (jobData){
            if (this.state.status){
                console.log(this.state.status)

                jobData=jobData.filter((app) => {
                    console.log(app)
                    return this.state.status.indexOf(app.applications[0].status) > -1
                })
            }
            console.log(jobData)

        }
        return (
            <div style={{backgroundColor:"#F7F7F7"}}>
                {logincookie}
                {navbar}
                <div class="row">
                <div class="col-md-2"></div>
                    <div class="col-md-8">
                <Card>
                <CardContent>
                    <div>
                    {/* <div style={{fontWeight:'550',fontSize:'16px',marginBottom:'20px'}}>Filters</div> */}
                    <div style={{fontWeight:'550',fontSize:'13px',padding:'16px'}}>Filter by Status</div>
                    <select id="status" name="status" style = {{width:"80%",fontSize:'13px',marginLeft:'16px'}} onChange={this.statusFilter} >
                        <option value="" disabled selected>+ Add Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Declined">Declined</option>
                    </select></div>
                </CardContent>
            </Card></div>
                
                <div class="col-md-2"></div>
                </div>
                <br/>
                <div class="row">
                <div class="col-md-2"></div>
                    <div class="col-md-8">
                {jobData.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((data, index) => {

                // {jobData.map((data, index) => {
                    return (
                        <div key={data._id}>
                           <Card>
                            <CardContent>
                            <div class="row">
                                <div class="col-md-1"  style={{paddingRight:'0px'}}>
                                <Avatar src={data.companydetails[0].image?data.companydetails[0].image:this.state.emptyprofilepic} style={{ width: '36px', height: '36px', borderRadius: '50%', textAlign: 'center' }}></Avatar>
                                </div>
                                <div class="col-md-5"  style={{padding:'0px'}}>

                                <h5>{data.title?data.title:""}</h5>
                                

                                </div>
                            </div><br/>
                            <div class="row">
                                <div class="col-md-2" >
                            {data.companydetails[0].name?(<div><BusinessOutlinedIcon fontSize="small" style={{ color: "#1569E0" }}></BusinessOutlinedIcon> {data.companydetails[0].name}</div>):<div></div>} 
                            </div> <div class="col-md-2" >
                            {data.companydetails[0].location?(<div><LocationOnOutlinedIcon fontSize="small" style={{ color: "#1569E0" }}></LocationOnOutlinedIcon> {data.companydetails[0].location}</div>):<div></div>} 
                            </div> <div class="col-md-2" >
                            {data.applications[0].appliedDate.substring(0,10)?(<div><EventAvailableOutlinedIcon fontSize="small" style={{ color: "#1569E0" }}></EventAvailableOutlinedIcon> {data.applications[0].appliedDate.substring(0,10)}</div>):<div></div>} 
                            </div> <div class="col-md-2" >
                            {data.applications[0].status?(<div><FlagOutlinedIcon fontSize="small" style={{ color: "#1569E0" }}></FlagOutlinedIcon> {data.applications[0].status}</div>):<div></div>} 
                            </div> </div>
                            {/* <p><BusinessOutlinedIcon fontSize="small"></BusinessOutlinedIcon> {data.companydetails[0].name}</p>
                            <p><LocationOnOutlinedIcon fontSize="small"></LocationOnOutlinedIcon> {data.companydetails[0].location}</p>
                            <p><EventAvailableOutlinedIcon fontSize="small"></EventAvailableOutlinedIcon> {data.applications[0].appliedDate.substring(0,10)}</p>
                            <p> <FlagOutlinedIcon fontSize="small"></FlagOutlinedIcon> {data.applications[0].status}</p> */}
                            </CardContent></Card>
                            <br /><br />
                        </div>
                    )
                })}</div>
              
                <div class="col-md-2"></div>
                </div>
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

        )
    }
}
export default Applications;