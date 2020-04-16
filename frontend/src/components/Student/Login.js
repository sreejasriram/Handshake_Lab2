import React, {Component} from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {environment} from '../../Utils/constants';
import { connect } from "react-redux";
import { editContact } from "../../redux/actions/index";
const jwt_decode = require("jsonwebtoken");

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : "",
            authFlag : false,
            cred:false,
            token:""

            
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    // componentWillMount(){
    //     this.setState({
    //         authFlag : false
            
    //     })
    // }
      submitLogin = (e) => {
        var headers = new Headers();
        e.preventDefault();
        const data = {
            email : this.state.email,
            password : this.state.password
        }
        axios.defaults.withCredentials = true;
        console.log("in frontend before axios");
        console.log(data)
        axios.get(environment.baseUrl+'/student/student_signin/'+this.state.email+"/"+this.state.password)
            .then(response => {
              console.log("in frontend after response");
              console.log("response" + response.data.result)
              if (response.data.result) {
                //   sessionStorage.setItem('id', response.data.result);
                //   let stud_id = sessionStorage.getItem('id');
                //   console.log(stud_id)
                  this.setState({
                    token:response.data.result,
                    authFlag : true,
                    cred : false
                  })
              } else if (response.data.error) {
                  this.setState({
                    authFlag : false
                  })
              }      
            })  
    }

    render(){
        let credvalue = null;
        let redirectVar = null

        console.log(this.state.token)
        if (this.state.token.length > 0) {
            sessionStorage.setItem("token", this.state.token);

            var decoded = jwt_decode.decode(this.state.token.split(' ')[1]);

            // console.log(decoded.payload)
            sessionStorage.setItem("id", decoded._id);
            sessionStorage.setItem("username", decoded.username);
            console.log(decoded._id)
            console.log(decoded.username)
        }


        if(cookie.load('student')){
            redirectVar = <Redirect to= "/StudProfile"/>
        }
       if (this.state.cred==true){
        credvalue = <p>Invalid Credentials</p>
       }
        return(
            <div>
            <div class="container">
                {redirectVar}
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Student Login</h2>
                            <p><Link to="/cmpylogin">click here for Company Login</Link></p>
                        </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="text" class="form-control" name="email" placeholder="Email"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>
                            <button onClick = {this.submitLogin} class="btn btn-primary">Login</button>                 
                    </div>
                    {credvalue}
                </div>                  
            </div> 
            </div>
        )
    }
}
export default Login;