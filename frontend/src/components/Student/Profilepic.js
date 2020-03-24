
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
            first_name: "",
            last_name: "",
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
            name: this.state.first_name+" "+this.state.last_name,
            type: "prof_pic"
        }
        console.log(edit_data)
        const data = {
            id: stud_id,
            type: "prof_pic"
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
                axios.post(environment.baseUrl+'/student/get_student_profpic', data)
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
            type: "prof_pic"
        }
        console.log(data)
        axios.post(environment.baseUrl+'/student/get_student_profpic', data)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                if (response.data.rows.length) {
                    console.log("aa")
                    this.setState({
                        dataRetrieved: true,
                        profileData: response.data.rows
                     
                        //  first_name: response.data.rows[0].substr(0,response.data.rows[0].indexOf(' ')),
                        //  last_name: response.data.rows[0].substr(response.data.rows[0].indexOf(' ')+1)                      
                    });
                    if (response.data.rows[0].name){
                    var arr = response.data.rows[0].name.split(" ")
                    this.setState({
                        first_name:arr[0],
                        last_name:arr[1]

                    });
                }

                    console.log(this.state.first_name)

                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                }
            })
    }


    render() {

        let renderRedirect = null;
        let profileData = this.state.profileData;
        console.log(profileData);
        // if(profileData.length)
        // var arr = profileData[0].name.split(" ")
        // console.log(arr)
        // console.log(this.state.first_name)
        // console.log(this.state.last_name)

        if (this.state.redirect === true || profileData.length == 0) {
            renderRedirect = (
                <div>
                    <Card>
                        <CardContent>
                        {/* <Typography color="black" gutterBottom><b><p style={{ fontSize: '24px' }}>Basic Details</p></b></Typography> */}
                            <div style={{ width: '100%' }} class="form-group">

                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="first_name" value={this.state.first_name} placeholder="First Name" /><br/>
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="last_name" value={this.state.last_name} placeholder="Last Name" />
                                
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
                                                <b><p style={{ fontSize: '24px' }}>{data.name}</p></b>

                                            </Typography>
                                            </div>
                                            <div class="col-md-2">
                                            <CreateOutlinedIcon onClick={this.editProfile} style={{ alignContent: 'right',height:"15px",width:"15px" }}></CreateOutlinedIcon>
                                            </div>
                                            </div>
                                            <p>{data.clg}</p>
                                            <p>{data.major}, {data.cgpa} </p>
                             

                                        </CardContent>
                                    </Card>
                                    <br /><br />
                                </div>
                                
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