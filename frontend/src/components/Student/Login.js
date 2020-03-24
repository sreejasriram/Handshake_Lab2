import React, {Component} from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {environment} from '../../Utils/constants';


//Define a Login Component
class Login extends Component{
    //call the constructor method
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "",
            authFlag : false,
            cred:false
            
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
            
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        console.log("in frontend before axios");
        axios.post(environment.baseUrl+'/student/student_signin',data)
            .then(response => {
              //  console.log("Status Code : ",response.status);

              console.log("in frontend after response");

              console.log("response" + response.data.result)
              if (response.data.result) {
                 
                  sessionStorage.setItem('id', response.data.result);
                  let stud_id = sessionStorage.getItem('id');
                  console.log(stud_id)
                  this.setState({
                    authFlag : true,
                    cred : false
                  })



              } else if (response.data.error) {
                  this.setState({
                    authFlag : false
                  })
              }

                
            })
            // .catch(
            //     this.setState({
            //     cred : true
                
            // }));
          
            

            
    }

    render(){
        let credvalue = null;
let redirectVar = null
        //redirect based on successful login
        if(cookie.load('student')){
            redirectVar = <Redirect to= "/StudProfile"/>
          // credvalue = <p>valid Credentials</p>

        }
       if (this.state.cred==true){
        credvalue = <p>Invalid Credentials</p>
       }
    //    if (this.state.cred==false){
    //     credvalue = <p>s Credentials</p>
    //    }

           


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
                                <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
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