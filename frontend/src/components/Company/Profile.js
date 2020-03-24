
import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import Jobs from './Jobs';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import {environment} from '../../Utils/constants';



//Define a Login Component
class Profile extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            name: "",
            loc: "",
            desc: "",
            contact: "",
            // id: this.props.location.state.id,
            dataRetrieved: false,
            redirect: false,
            profileData: [],
            rerender:false

            // name, location, description, contact information,
        }
        this.editProfile = this.editProfile.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.cancel = this.cancel.bind(this);

    }


    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    editProfile = (e) => {
        var headers = new Headers();
        //prevent page from refresh
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
      redirect:false
      })
    

    }
    saveProfile = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        let cmpny_id = sessionStorage.getItem('id');
        this.setState({
            redirect: false,
            rerender: false


        })
        const edit_data = {
            id: cmpny_id,
            name: this.state.name,
            loc: this.state.loc,
            desc: this.state.desc,
            contact: this.state.contact
        }
        axios.post(environment.baseUrl+'/company/save_company_profile', edit_data)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                if (response.data.rows) {
                    this.setState({
                        rerender: true

                    });
                    // console.log(response.data.rows[0].title)
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                }
            })

        const data = {
            id: cmpny_id
        }

        axios.post(environment.baseUrl+'/company/company_profile', data)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                if (response.data.rows) {
                    this.setState({
                        dataRetrieved: true,
                        profileData: response.data.rows,
                        rerender: true

                    });
                    // console.log(response.data.rows[0].title)
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                }
            })
    }
    
    componentDidMount() {
        let cmpny_id = sessionStorage.getItem('id');
        const data = {
            id: cmpny_id,
            name: "",
            loc: "",
            desc: "",
            contact: "",
        }

        axios.post(environment.baseUrl+'/company/company_profile', data)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                if (response.data.rows) {
                    this.setState({
                        dataRetrieved: true,
                        profileData: response.data.rows,
                        name: response.data.rows[0].name,
                        loc: response.data.rows[0].loc,
                        desc: response.data.rows[0].cmpyDesc,
                        contact: response.data.rows[0].contact
                    });
                    // console.log(response.data.rows[0].title)
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                }
            })
    }


    render() {
        let renderRedirect = null;
        let redirectVar = null;
        let profileData = this.state.profileData;
  
        if (this.state.redirect === true || profileData.length==0) {
            renderRedirect = (
            <div>
                    <input onChange={this.inputChangeHandler} type="text" class="form-control" name="name" value = {this.state.name} placeholder="Name" />
                    <input onChange={this.inputChangeHandler} type="text" class="form-control" name="loc" value = {this.state.loc} placeholder="Location" />
                    <input onChange={this.inputChangeHandler} type="text" class="form-control" name="contact" value = {this.state.contact} placeholder="Contact" />
                    <input onChange={this.inputChangeHandler} type="text" class="form-control" name="desc" value = {this.state.desc} placeholder="Description" />
                    <button onClick={this.saveProfile} class="btn btn-primary">save</button> &nbsp; &nbsp;
                    <button onClick={this.cancel} class="btn btn-primary">Cancel</button> 
            </div>
            );
            
        }
        else if (this.state.redirect === false || this.state.rerender === true) {
           if (profileData.length>0) {
            renderRedirect =(

                    profileData.map((data, index) => {
                        return (
                            <div>
                                  <Card>
                                        <CardContent>
                            <div key={data.cmpy_id}>
                            <div class="row">
                                            <div class="col-md-10">
                            <Typography color="black" gutterBottom>
                                            <b><p style={{ fontSize: '24px' }}>{data.name}</p></b> </Typography>
                                            </div>
                                            <div class="col-md-2">
                                            <CreateOutlinedIcon onClick={this.editProfile} style={{ alignContent: 'right',height:"15px",width:"15px" }}></CreateOutlinedIcon>
                                            </div>
                                            </div>
                                <p>{data.cmpyDesc}</p>
                               
                               { data.contact?(<p><PhoneOutlinedIcon></PhoneOutlinedIcon> {data.contact}</p>):<p></p>}
                                <p><EmailOutlinedIcon></EmailOutlinedIcon> {data.email}</p>
                                <p><LocationOnOutlinedIcon></LocationOnOutlinedIcon>{data.loc}</p><br /><br />

                            </div>
                            {/* <div class="container">
                                <div class="login-form">
                                    <div class="main-div"> */}
                                        {/* <button onClick={this.editProfile} class="btn btn-primary">Edit Profile</button> */}
                                                                 

                                    {/* </div>
                                </div>
                            </div> */}
                            </CardContent></Card></div>
                   
                )
                    }))
                }

        }
       
        return (
            <div>
                {redirectVar}
                <div class="row">
                <div class="col-md-2"></div>
             <div class="col-md-8">
                {renderRedirect}
                </div>
                <div class="col-md-2"></div></div>
            </div>
        )
    }
}
//export Login Component
export default Profile;