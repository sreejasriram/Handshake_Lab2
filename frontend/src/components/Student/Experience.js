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
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
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


class Experience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cmpy_name: "",
            title: "",
            cmpyloc: "",
            start_date: "",
            end_date: "",
            work_desc: "",
            dataRetrieved: false,
            redirect: false,
            profileData: [],
            rerender: false,
        }
        this.editProfile = this.editProfile.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.cancel = this.cancel.bind(this);

    }


    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    editProfile = (e) => {
        var headers = new Headers();
        e.preventDefault();
        this.setState({
            redirect: true
        })
    }
    cancel = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        //   window.history.back();
        this.setState({
            redirect: false
        })
    }

    saveProfile = (e) => {
        var headers = new Headers();
        e.preventDefault();
        let stud_id = sessionStorage.getItem('id');
        this.setState({
            redirect: false,
            rerender: false
        })
        const edit_data = {
            id: stud_id,
            cmpy_name: this.state.cmpy_name,
            title: this.state.title,
            cmpyloc: this.state.cmpyloc,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            work_desc: this.state.work_desc,
            type: "experience"
        }
        const data = {
            id: stud_id,
            type: "experience"
        }
        axios.post(environment.baseUrl+'/student/student_profile', edit_data)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                if (response.data.rows.length) {
                    this.setState({
                        rerender: true

                    });
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                }
            }
            )

            .then(response => {
                axios.post(environment.baseUrl+'/student/get_student_experience', data)
                    .then(response => {
                        console.log("in frontend after response");
                        console.log(response.data.rows)
                        if (response.data.rows.length) {
                            this.setState({
                                dataRetrieved: true,
                                profileData: response.data.rows,
                                rerender: true
                            });
                        } else if (response.data.error) {
                            console.log("response" + response.data.error)
                        }
                    })
            })
    }


    componentDidMount() {
        let stud_id = sessionStorage.getItem('id');
        console.log("inside did mount")
        console.log(stud_id)
        const data = {
            id: stud_id,
            type: "experience"
        }
        console.log(data)
        axios.post(environment.baseUrl+'/student/get_student_experience', data)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                if (response.data.rows.length) {
                    this.setState({
                        dataRetrieved: true,
                        profileData: response.data.rows,
                        cmpy_name: response.data.rows[0].cmpy_name,
                        title: response.data.rows[0].title,
                        cmpyloc: response.data.rows[0].loc,
                        start_date: response.data.rows[0].start_date.substring(0, 10),
                        end_date: response.data.rows[0].end_date.substring(0, 10),
                        work_desc: response.data.rows[0].work_desc
                    });
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                }
            })
    }


    render() {
        let renderRedirect = null;
        let profileData = this.state.profileData;
        console.log(profileData)
        if (this.state.redirect === true || profileData.length == 0) {
            renderRedirect = (
                <div> <Card>
                    <CardContent>
                        <Typography color="black" gutterBottom><b><p style={{ fontSize: '24px' }}>Experience</p></b></Typography>

                        <div style={{ width: '30%' }} class="form-group">
                            <input onChange={this.inputChangeHandler} type="text" class="form-control" name="cmpy_name" value={this.state.cmpy_name} placeholder="Company Name" />
                            <input onChange={this.inputChangeHandler} type="text" class="form-control" name="title" value={this.state.title} placeholder="Title" />
                            <input onChange={this.inputChangeHandler} type="text" class="form-control" name="cmpyloc" value={this.state.cmpyloc} placeholder="Location" />
                            <input onChange={this.inputChangeHandler} type="date" class="form-control" name="start_date" value={this.state.start_date} placeholder="Start Date" />
                            <input onChange={this.inputChangeHandler} type="date" class="form-control" name="end_date" value={this.state.end_date} placeholder="End Date" />
                            <input onChange={this.inputChangeHandler} type="text" class="form-control" name="work_desc" value={this.state.work_desc} placeholder="Work Description" />
                        </div>
                        <button onClick={this.saveProfile} class="btn btn-primary">save</button>&nbsp;
                            <button onClick={this.cancel} class="btn btn-primary" style={{ backgroundColor: "#F7F7F7", color: "black" }}>Cancel</button>
                    </CardContent></Card><br /><br />
                </div>
            );
        }
        else if (this.state.redirect === false || this.state.rerender === true) {
            if (profileData.length > 0) {
                renderRedirect = (
                    profileData.map((data, index) => {
                        return (
                            <div>
                                <div key={data.stud_id}>
                                    <Card>
                                        <CardContent>
                                            <div class="row">
                                                <div class="col-md-10">

                                                    <Typography color="black" gutterBottom>
                                                        <b><p style={{ fontSize: '24px' }}>Work Experience</p></b>
                                                    </Typography>
                                                </div>
                                                <div class="col-md-2">
                                                    <CreateOutlinedIcon onClick={this.editProfile} style={{ alignContent: 'right', height: "15px", width: "15px" }}></CreateOutlinedIcon>
                                                </div>
                                            </div>
                                            <h4><WorkOutlineOutlinedIcon></WorkOutlineOutlinedIcon><b> {data.cmpy_name}</b></h4>
                                            <p><PersonOutlinedIcon></PersonOutlinedIcon> {data.title}</p>
                                            <p><LocationOnOutlinedIcon></LocationOnOutlinedIcon>{data.loc}</p>
                                            <p><DateRangeOutlinedIcon></DateRangeOutlinedIcon> {data.start_date.substring(0, 10)} - {data.end_date.substring(0, 10)}</p>
                                            <div class="row">
                                                <div class="col-md-10">
                                                    <Button color="primary" style={{ fontSize: "15px", left: "300px" }}>
                                                        Add Experience
                                            </Button></div></div>
                                        </CardContent>
                                    </Card>
                                    <br /><br />
                                </div>
                                {/* <div class="container">
                                    <div class="login-form">
                                        <div class="main-div">
                                            <button onClick={this.editProfile} class="btn btn-primary">Edit Profile</button>
                                        </div>
                                    </div>
                                </div> */}
                            </div>

                        )
                    }))
            }

        }

        return (
            <div>
                {renderRedirect}
            </div>
        )
    }
}
export default Experience;