import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {environment} from '../../Utils/constants';


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : "",
            authFlag : false,
            cred:false
            
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    componentWillMount(){
        this.setState({
            authFlag : false
            
        })
    }
    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submitLogin = (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        console.log("in frontend before axios");
        axios.get(environment.baseUrl+'/company/company_signin/'+this.state.email+"/"+this.state.password)
            .then(response => {
              console.log("in frontend after response");  
             
              if (response.data.result) {
                sessionStorage.setItem('id', response.data.result);  
                  this.setState({
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
export default Login;