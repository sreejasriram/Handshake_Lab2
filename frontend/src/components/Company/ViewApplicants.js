
import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import Jobs from './Jobs';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import {environment} from '../../Utils/constants';


class ViewApplicants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            job_id:this.props.match.params.jobId,
            dataRetrieved: false,
            redirect: false,
            stuData: [],
            applications:[],
            view_profile:false,
            studId:"",
            showStatus : "",
            statusUpdated:"",
            previewresume:false
        }
        this.viewProfile = this.viewProfile.bind(this);
        this.previewResume = this.previewResume.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.fetchApplicants = this.fetchApplicants.bind(this);
       
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    previewResume = (e) =>{
        this.setState(currentState =>({
            previewresume : !currentState.previewresume
        }))
    }

    updateStatus = (studentId) => {
        let data ={
            jobId:this.state.job_id,
            studentId:studentId,
            status:this.state.showStatus
        }
        console.log(data)
        axios.put(environment.baseUrl+'/company/updateStudentstatus', data)
            .then(response => {
                console.log(response)
                if (response.data.result){
                    console.log(response.data.result)
                    this.setState({
                        statusUpdated:true
                    })
                     this.fetchApplicants()
                }
                else if (response.data.error) {
                    console.log(response.data.error)
                    this.setState({
                        statusUpdated:false
                    })
            }})
    }
  
    fetchApplicants()
    {
        let cmpny_id = sessionStorage.getItem('id');
        const data = {
            job_id:this.state.job_id
        }

        axios.get(environment.baseUrl+'/company/list_applicants/'+data.job_id)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                if (response.data.rows.length>0) {
                    this.setState({
                        dataRetrieved: true,
                        stuData: response.data.rows[0].listApplicants,
                        applications:response.data.rows[0].applications
                        // name: response.data.rows[0].name,
                        // email: response.data.rows[0].email,
                        // mobile: response.data.rows[0].mobile
                    });
                  
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                }
            })


    }
    viewProfile = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        console.log(e.target.value);
        this.setState({
            view_profile: true,
            studId:e.target.value

        })
    }


    componentDidMount() {
      
        this.fetchApplicants()
    }


    render() {
        let renderRedirect = null;
     let res=""
        if (this.state.view_profile === true) {
            renderRedirect = <Redirect to={`/ViewProfile/${this.state.studId}`}/>
        }
        
        let stuData = this.state.stuData;
        let applications = this.state.applications
        console.log(stuData)
        return (
            <div>
                <div class="container">
                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <h2>Students Applied </h2>
                            </div>
                            <div>
                                {renderRedirect}
                            </div>
                           
                                <div>
                                    {stuData.map((data, index) => {
                                        return (
                                            <div key={data._id}>
                                                <Card>
                                                    <CardContent>
                                                    < Typography color="black" gutterBottom>
                                                    <b><p style={{ fontSize: '24px' }}>{data.name}</p></b></ Typography>
                                                <p><MailOutlineOutlinedIcon></MailOutlineOutlinedIcon> {data.email}</p>
                                                <p><PhoneOutlinedIcon></PhoneOutlinedIcon> {data.mobile}</p>
                                                {applications.map((app, index) => {
                                                   console.log(app)
                                                       if (app.studentId===data._id){
                                                        res=app.resume
                                                    return(
                                                    <div>
                                                <p>Status: {app.status}</p>
                                               
                                               
                                                <button class="btn btn-primary" onClick={()=>this.previewResume()} style={{background:"none",textDecoration:"underline",color:"blue",border:"none"}}>View Resume</button><br/>
                                                </div>)
                                              
                                            }
                                                })}
                                                <div class="row">
                                                     <div class="col-md-2">
                                                     <button onClick={this.viewProfile} class="btn btn-primary"  value={data._id}>View Profile</button> 

                                             
                                                     </div> <div class="col-md-8">
                                                    </div> <div class="col-md-2">
                                                    <select name="showStatus" onChange={this.inputChangeHandler} >
                                                        <option value="Change Status" disabled selected>Change Status</option>
                                                        <option value="Pending" >Pending</option>
                                                        <option value="Reviewed" >Reviewed</option>
                                                        <option value="Declined" >Declined</option>

                                                    </select></div> </div>
                                                    <div class="row">
                                                    <div class="col-md-10"></div>
                                                    <div class="col-md-2">
                                                    <button class="btn btn-primary"  onClick={()=>(this.updateStatus(data._id))}>Update Status</button>
                                                    </div></div>
                                                </CardContent></Card>
                                                    <Dialog
                                                        aria-labelledby="simple-modal-title"
                                                        aria-describedby="simple-modal-description" 
                                                        open={this.state.previewresume}
                                                        style = {{height:"800", width:"500"}}>
                                                        <div>
                                                        <h2 id="simple-modal-title">Resume</h2>
                                                        <DialogContent>
                                                            <div>
                                                            <object type="application/pdf"
                                                                data={res}
                                                                width="500"
                                                                height="800">
                                                            </object>
                                                            </div>
                                                            <div className='col-md-9'>
                                                            </div>
                                                            <div className='col-md-3'>
                                                                <button onClick={()=>{this.previewResume()}} class="btn btn-primary" style={{backgroundColor:'#1569E0',borderRadius:'5px'}}>Close</button>
                                                            </div>
                                                        </DialogContent>                  
                                                        </div>
                                                    </Dialog> 
                                            </div>
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
export default ViewApplicants;