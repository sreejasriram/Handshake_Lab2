
import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
// import { Button } from 'react-bootstrap';

///
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import CakeOutlinedIcon from '@material-ui/icons/CakeOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import {environment} from '../../Utils/constants';

///
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


///
class Basic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // name: "",
            date: "",
            city: "",
            state: "",
            country: "",
            // career_obj: "",
            dataRetrieved: false,
            redirect: false,
            profileData: [],
            rerender: false,

        }
        ///


        ///
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
            // name: this.state.name,
            date: this.state.date,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            // career_obj: this.state.career_obj,
            type: "basic"
        }
        console.log(edit_data)
        const data = {
            id: stud_id,
            type: "basic"
        }
        axios.post(environment.baseUrl+'/student/student_profile', edit_data)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                if (response.data.rows) {
                    this.setState({
                        rerender: true
                    });
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                }
            }
            )

            .then(response => {
                axios.post(environment.baseUrl+'/student/get_student_basic', data)
                    .then(response => {
                        console.log("in frontend after response");
                        console.log(response.data.rows)
                        if (response.data.rows) {
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
            type: "basic"
        }
        console.log(data)
        axios.post(environment.baseUrl+'/student/get_student_basic', data)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                if (response.data.rows.length) {
                    this.setState({
                        dataRetrieved: true,
                        profileData: response.data.rows,
                        // name: response.data.rows[0].name,
                        date: response.data.rows[0].dob.substring(0,10),
                        city: response.data.rows[0].city,
                        state: response.data.rows[0].state,
                        country: response.data.rows[0].country,
                        // career_obj: response.data.rows[0].career_obj

                    });
console.log(response.data.rows[0].dob)

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
                <div>
                    <Card>
                        <CardContent>
                        <Typography color="black" gutterBottom><b><p style={{ fontSize: '24px' }}>Basic Details</p></b></Typography>
                            <div style={{ width: '70%' }} class="form-group">

                                {/* <input onChange={this.inputChangeHandler} type="text" class="form-control" name="name" value={this.state.name} placeholder="Name" /> */}
                                <input onChange={this.inputChangeHandler} type="date" class="form-control" name="date" value={this.state.date} placeholder="Date" />
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="city" value={this.state.city} placeholder="City" />
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="state" value={this.state.state} placeholder="State" />
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="country" value={this.state.country} placeholder="Country" />
                                {/* <input onChange={this.inputChangeHandler} type="text" class="form-control" name="career_obj" value={this.state.career_obj} placeholder="Career Objective" /> */}

                            </div>
                            <button onClick={this.saveProfile} class="btn btn-primary">save</button>&nbsp;
                            <button onClick={this.cancel} class="btn btn-primary" style={{backgroundColor:"#F7F7F7",color:"black"}}>Cancel</button>
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
                                                <b><p style={{ fontSize: '24px' }}>Personal Details</p></b>

                                            </Typography>
                                            </div>
                                            <div class="col-md-2">
                                            <CreateOutlinedIcon onClick={this.editProfile} style={{ alignContent: 'right',height:"15px",width:"15px" }}></CreateOutlinedIcon>
                                            </div>
                                            </div>
                                            <p><CakeOutlinedIcon></CakeOutlinedIcon> {data.dob.substring(0, 10)}</p>
                                            <p><LocationOnOutlinedIcon></LocationOnOutlinedIcon> {data.city}, {data.state}, {data.country} </p>
                                            {/* <p>{data.career_obj}</p> */}

                                        </CardContent>
                                    </Card>
                                    <br /><br />
                                </div>
                                {/* <div class="container">
                                    <div class="login-form">
                                        <div class="main-div">
                                        <CreateOutlinedIcon onClick={this.editProfile}>
                                        // <button onClick={this.editProfile} class="btn btn-primary">Edit Profile</button>
                                        </CreateOutlinedIcon>
                                            
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
export default Basic;