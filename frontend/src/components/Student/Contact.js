
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
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import {environment} from '../../Utils/constants';


class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            mobile: "",
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
            if (this.props.email!==nextProps.email)
            this.setState({ email:nextProps.email});
            if (this.props.mobile!==nextProps.mobile)
            this.setState({ mobile:nextProps.mobile});
           

            

            if (this.state.email || this.state.mobile) {
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
            email: this.state.email,
            mobile: this.state.mobile
        }
        console.log(edit_data)
        axios.post(environment.baseUrl+'/student/student_contact_edited', edit_data)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.result)
                if (response.data.result) {
                    this.setState({
                        
                        rerender: false,
                        email: response.data.result.email,
                        mobile: response.data.result.mobile

                    });
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                }
            }
            )
    }


    render() {
        let renderRedirect = null;
      
            // if (this.state.redirect === true || (dob==undefined && city==undefined && state==undefined && country==undefined)) {
        if (this.state.redirect === true){
            renderRedirect = (
                <div>
                    <Card>
                        <CardContent>
                        <Typography color="black" gutterBottom><b><p style={{ fontSize: '24px' }}>Contact</p></b></Typography>
                            <div style={{ width: '70%' }} class="form-group">
                            <input onChange={this.inputChangeHandler} type="text" class="form-control" name="mobile" value={this.state.mobile} placeholder="Mobile" />

                                <input onChange={this.inputChangeHandler} type="email" class="form-control" name="email" value={this.state.email} placeholder="Email" />
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
                                                <b><p style={{ fontSize: '24px' }}>Contact</p></b>

                                            </Typography>
                                            </div>
                                            <div class="col-md-2">
                                            <CreateOutlinedIcon onClick={this.editProfile} style={{ alignContent: 'right',height:"15px",width:"15px" }}></CreateOutlinedIcon>
                                            </div>
                                            </div>
                                            <p><PhoneOutlinedIcon></PhoneOutlinedIcon> {this.state.mobile}</p>
                                    <p><EmailOutlinedIcon></EmailOutlinedIcon> {this.state.email}</p>
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
export default Contact;






// ///////////////


// class Contact extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             phone: "",
//             email: "",
//             dataRetrieved: false,
//             redirect: false,
//             profileData: [],
//             rerender: false,
//         }
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
//      //   window.history.back();
//      this.setState({
//       redirect:false
//       })
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
//             phone: this.state.phone,
//             email: this.state.email,
//             type: "contact"
//         }
//         const data = {
//             id: stud_id,
//             type: "contact"
//         }
//         axios.post(environment.baseUrl+'/student/student_profile', edit_data)
//             .then(response => {
//                 console.log("in frontend after response");
//                 console.log(response.data.rows.length)
//                 if (response.data.rows) {
//                         this.setState({
//                             rerender: true
//                         });                    
//                 } else if (response.data.error) {
//                     console.log("response" + response.data.error)
//                 }
//             }
//             )

//            .then(response => {
//                 axios.post(environment.baseUrl+'/student/get_student_contact', data)
//                     .then(response => {
//                         console.log("in frontend after response");
//                         console.log(response.data.rows)
//                         if (response.data.rows.length) {
//                             this.setState({
//                                 dataRetrieved: true,
//                                 profileData: response.data.rows,
//                                 rerender: true
//                             });
//                         } else if (response.data.error) {
//                             console.log("response" + response.data.error)
//                         }
//                     })
//                 })
//         }
            

//     componentDidMount() {
//         let stud_id = sessionStorage.getItem('id');
//         console.log("inside did mount")
//         console.log(stud_id)

//         const data = {
//             id: stud_id,
//             type: "contact"
//         }
//         console.log(data)
//         axios.post(environment.baseUrl+'/student/get_student_contact', data)
//             .then(response => {
//                 console.log("in frontend after response");
//                 console.log(response.data.rows)
//                 if (response.data.rows.length) {
//                     this.setState({
//                         dataRetrieved: true,
//                         profileData: response.data.rows,
//                         phone: response.data.rows[0].phone,
//                         email: response.data.rows[0].email
//                     });
//                     // console.log(response.data.rows[0].title)
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
//                 <div> <Card>
//                 <CardContent>
//                 <Typography color="black" gutterBottom><b><p style={{ fontSize: '24px' }}>Contact</p></b></Typography>

//                 <div style={{ width: '30%' }} class="form-group">

//                     <input onChange={this.inputChangeHandler} type="text" class="form-control" name="phone" value = {this.state.phone} placeholder="Phone" />
//                     <input onChange={this.inputChangeHandler} type="email" class="form-control" name="email" value = {this.state.email} placeholder="Email" />
//                     </div>
//                     <button onClick={this.saveProfile} class="btn btn-primary">save</button>&nbsp;
//                             <button onClick={this.cancel} class="btn btn-primary" style={{backgroundColor:"#F7F7F7",color:"black"}}>Cancel</button>
//                     </CardContent></Card><br/><br/>
//                 </div>
//             );

//         }
//         else if (this.state.redirect === false || this.state.rerender === true) {
//             if (profileData.length > 0) {
//                 renderRedirect = (
//                     profileData.map((data, index) => {
//                         return (
//                             <div>
//                                 <div key={data.stud_id}>
//                                 <Card>
//                                         <CardContent>
//                                         <div class="row">
//                                             <div class="col-md-10">

//                                             <Typography color="black" gutterBottom>
//                                             <b><p style={{ fontSize: '24px' }}>Personal Information</p></b>
//                                             </Typography>
//                                             </div>
//                                             <div class="col-md-2">
//                                             <CreateOutlinedIcon onClick={this.editProfile} style={{ alignContent: 'right',height:"15px",width:"15px" }}></CreateOutlinedIcon>
//                                             </div>
//                                             </div>
//                                     <p><PhoneOutlinedIcon></PhoneOutlinedIcon> {data.phone}</p>
//                                     <p><EmailOutlinedIcon></EmailOutlinedIcon> {data.email}</p>
//                                     </CardContent>
//                                         </Card>
//                                     <br /><br />
//                                 </div>
//                                 {/* <div class="container">
//                                     <div class="login-form">
//                                         <div class="main-div">
//                                             <button onClick={this.editProfile} class="btn btn-primary">Edit Profile</button>
//                                         </div>
//                                     </div>
//                                 </div> */}
                                
//                                 </div>

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
// export default Contact;