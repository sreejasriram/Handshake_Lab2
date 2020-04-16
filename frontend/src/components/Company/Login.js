import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {environment} from '../../Utils/constants';
import { connect } from "react-redux";
import { companyLogin } from "../../redux/actions/index";
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
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    // componentWillMount(){
    //     this.setState({
    //         authFlag : false
            
    //     })
    // }
    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submitLogin = (e) => {
        e.preventDefault();
        // axios.defaults.withCredentials = true;
        console.log("in frontend before axios");
        console.log(this.state.password)
        let data={
            email:this.state.email,
            password:this.state.password,
        }
        // this.props.companyLogin(data);

        axios.get(environment.baseUrl+'/company/company_signin/'+this.state.email+"/"+this.state.password)
            .then(response => {
              console.log("in frontend after response");  
              if (response.data.result) {
                console.log(response.data.result);  
                  this.setState({
                    token:response.data.result,
                    authFlag : true,
                    cred : false
                  })
              } else if (response.data.error) {
                  this.setState({
                    authFlag : false,
                    cred:true
                  })
              }                
            })
            
    }

    render(){
        let redirectVar=null;
        console.log("outside cookie")
        console.log(this.state.token)
        if (this.state.token) {
            sessionStorage.setItem("token", this.state.token);          
            var decoded = jwt_decode.decode(this.state.token.split(' ')[1]);
            sessionStorage.setItem("id", decoded._id);
            sessionStorage.setItem("username", decoded.username);
            console.log(decoded._id)
            console.log(decoded.username)
            redirectVar = <Redirect to="/home" />
        }

        if(cookie.load('company')){
            console.log("inside cookie")
            redirectVar = <Redirect to="/home"/>

        }
        console.log(this.state.cred)
        let credvalue = null;

       if (this.state.cred===true){
        credvalue = <p>Invalid Credentials</p>
       }
 

           


        return(
            <div>
            <div class="container">
            {redirectVar}
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Company Login</h2>
                            <p>Please enter your username and password</p>
                        </div>
                        
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="text" class="form-control" name="email" placeholder="Email"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>
                            <button onClick = {this.submitLogin} class="btn btn-primary">Login</button>                 
                    </div>{credvalue}
                </div>                 
            </div> 
            </div>
        )
    }
}
//export Login Component
// export default Login;
const mapStateToProps = state => {
    console.log(state.authFlag)
    console.log(state.cred)


    return {
        authFlag:state.authFlag,
        cred:state.cred

    };

};

function mapDispatchToProps(dispatch) {
    return {
        companyLogin: payload => dispatch(companyLogin(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);