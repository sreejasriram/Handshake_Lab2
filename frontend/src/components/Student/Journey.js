
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



class Journey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            career_objective: "",
           
            redirect: true,
            rerender: false
        }
        this.editProfile = this.editProfile.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    inputChangeHandler = (e) => {
        const value = e.target.value
        this.setState({
            [e.target.name]: value
        })
    }
    editProfile = (e) => {
        e.preventDefault();
        this.setState({
            redirect: true
        })
    }
    cancel = (e) => {
        e.preventDefault();
        this.setState({
            redirect: false
        })
    }
    componentWillReceiveProps(nextProps) {
            if (this.props.career_objective!==nextProps.career_objective)
            this.setState({ career_objective:nextProps.career_objective});
          
            

            if (this.state.career_objective) {
                this.setState({redirect:false})}



        }
    saveProfile = (e) => {
        e.preventDefault();
        let stud_id = sessionStorage.getItem('id');
        this.setState({
             redirect: false,
            rerender: false
        })
        const edit_data = {
            id: stud_id,
            career_objective: this.state.career_objective
        }
        console.log(edit_data)
        axios.post(environment.baseUrl+'/student/student_journey_edited', edit_data)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.result)
                if (response.data.result) {
                    this.setState({
                        
                        rerender: false,
                        career_objective: response.data.result.career_objective

                    });
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                }
            }
            )
    }


    render() {
        let renderRedirect = null;
      
        if (this.state.redirect === true){
            renderRedirect = (
                <div>
                    <Card>
                        <CardContent>
                        <Typography color="black" gutterBottom><b><p style={{ fontSize: '24px' }}>My Journey</p></b></Typography>
                            <div style={{ width: '70%' }} class="form-group">
                               <textarea  rows="4" cols="50" onChange={this.inputChangeHandler} type="text" class="form-control" name="career_objective" value={this.state.career_objective} placeholder="Type here.." />

                            </div>
                            <button onClick={this.saveProfile} class="btn btn-primary">save</button>&nbsp;
                            <button onClick={this.cancel} class="btn btn-primary" style={{backgroundColor:"#F7F7F7",color:"black"}}>Cancel</button>
                        </CardContent></Card><br /><br />
                </div>
            );


        }
        else if (this.state.redirect === false || this.state.rerender === true) {
                renderRedirect = 
                            <div>
                                    <Card>
                                        <CardContent>
                                        <div class="row">
                                            <div class="col-md-10">
                                            <Typography color="black" gutterBottom>
                                                <b><p style={{ fontSize: '24px' }}>My Journey</p></b>

                                            </Typography>
                                            </div>
                                            <div class="col-md-2">
                                            <CreateOutlinedIcon onClick={this.editProfile} style={{ alignContent: 'right',height:"15px",width:"15px" }}></CreateOutlinedIcon>
                                            </div>
                                            </div>
                                         <p>{this.state.career_objective}</p>

                                        </CardContent>
                                    </Card>
                                    <br /><br />
                                </div>
           
        }
        return (
            <div>
                {renderRedirect}
            </div>
        )
    }
}


// class Basic extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             name: "",
//             date: "",
//             city: "",
//             state: "",
//             country: "",
//             career_obj: "",
//             dataRetrieved: false,
//             redirect: false,
//             profileData: [],
//             rerender: false,

//         }
//         ///


//         ///
//         this.editProfile = this.editProfile.bind(this);
//         this.saveProfile = this.saveProfile.bind(this);
//         this.inputChangeHandler = this.inputChangeHandler.bind(this);
//         this.cancel = this.cancel.bind(this);
//     }


//     inputChangeHandler = (e) => {
//         this.setState({
//             [e.target.name]: e.target.value
//         })
//     }
//     editProfile = (e) => {
//         var headers = new Headers();
//         e.preventDefault();
//         this.setState({
//             redirect: true
//         })
//     }
//     cancel = (e) => {
//         var headers = new Headers();
//         //prevent page from refresh
//         e.preventDefault();
//         //   window.history.back();
//         this.setState({
//             redirect: false
//         })
//     }

//     saveProfile = (e) => {
//         var headers = new Headers();
//         e.preventDefault();
//         let stud_id = sessionStorage.getItem('id');
//         this.setState({
//             redirect: false,
//             rerender: false
//         })
//         const edit_data = {
//             id: stud_id,
//             name: this.state.name,
//             date: this.state.date,
//             city: this.state.city,
//             state: this.state.state,
//             country: this.state.country,
//             career_obj: this.state.career_obj,
//             type: "basic"
//         }
//         console.log(edit_data)
//         const data = {
//             id: stud_id,
//             type: "basic"
//         }
//         axios.post(environment.baseUrl+'/student/student_profile', edit_data)
//             .then(response => {
//                 console.log("in frontend after response");
//                 console.log(response.data.rows)
//                 if (response.data.rows) {
//                     this.setState({
//                         rerender: true
//                     });
//                 } else if (response.data.error) {
//                     console.log("response" + response.data.error)
//                 }
//             }
//             )

//             .then(response => {
//                 axios.post(environment.baseUrl+'/student/get_student_basic', data)
//                     .then(response => {
//                         console.log("in frontend after response");
//                         console.log(response.data.rows)
//                         if (response.data.rows) {
//                             this.setState({
//                                 dataRetrieved: true,
//                                 profileData: response.data.rows,
//                                 rerender: true
//                             });
//                         } else if (response.data.error) {
//                             console.log("response" + response.data.error)
//                         }
//                     })
//             })
//     }


//     componentDidMount() {
//         let stud_id = sessionStorage.getItem('id');
//         console.log("inside did mount")
//         console.log(stud_id)

//         const data = {
//             id: stud_id,
//             type: "basic"
//         }
//         console.log(data)
//         axios.post(environment.baseUrl+'/student/get_student_basic', data)
//             .then(response => {
//                 console.log("in frontend after response");
//                 console.log(response.data.rows)
//                 if (response.data.rows.length) {
//                     this.setState({
//                         dataRetrieved: true,
//                         profileData: response.data.rows,
//                         name: response.data.rows[0].name,
//                         date: response.data.rows[0].dob.substring(0,10),
//                         city: response.data.rows[0].city,
//                         state: response.data.rows[0].state,
//                         country: response.data.rows[0].country,
//                         career_obj: response.data.rows[0].career_obj

//                     });
// console.log(response.data.rows[0].dob)

//                 } else if (response.data.error) {
//                     console.log("response" + response.data.error)
//                 }
//             })
//     }


//     render() {

//         let renderRedirect = null;
//         let profileData = this.state.profileData;
//         console.log(profileData)
//         if (this.state.redirect === true || profileData.length == 0) {
//             renderRedirect = (
//                 <div>
//                     <Card>
//                         <CardContent>
//                         <Typography color="black" gutterBottom><b><p style={{ fontSize: '24px' }}>My Journey</p></b></Typography>
//                             <div style={{ width: '90%' }} class="form-group">

//                                <textarea  rows="4" cols="50" onChange={this.inputChangeHandler} type="text" class="form-control" name="career_obj" value={this.state.career_obj} placeholder="Career Objective" />

//                             </div>
//                             <button onClick={this.saveProfile} class="btn btn-primary">save</button>&nbsp;
//                             <button onClick={this.cancel} class="btn btn-primary" style={{backgroundColor:"#F7F7F7",color:"black"}}>Cancel</button>
//                         </CardContent></Card><br /><br />
//                 </div>
//             );

//         }
//         else if (this.state.redirect === false || this.state.rerender === true) {
//             if (profileData.length > 0) {
//                 renderRedirect = (
//                     profileData.map((data, index) => {
//                         return (
//                             <div>
//                                 <div key={data.name}>
//                                     <Card>
//                                         <CardContent>
//                                         <div class="row">
//                                             <div class="col-md-10">
//                                             <Typography color="black" gutterBottom>
//                                                 <b><p style={{ fontSize: '24px' }}>My Journey</p></b>

//                                             </Typography>
//                                             </div>
//                                             <div class="col-md-2">
//                                             <CreateOutlinedIcon onClick={this.editProfile} style={{ alignContent: 'right',height:"15px",width:"15px" }}></CreateOutlinedIcon>
//                                             </div>
//                                             </div>
                                          
//                                             <p>{data.career_obj}</p>
//                                             {/* <p>{data.career_obj}</p> */}

//                                         </CardContent>
//                                     </Card>
//                                     <br /><br />
//                                 </div>
                           
//                             </div>

//                         )
//                     }))
//             }
//         }

//         return (
//             <div>
//                 {renderRedirect}
//             </div>
//         )
//     }
// }
export default Journey;