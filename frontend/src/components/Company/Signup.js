import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {environment} from '../../Utils/constants';


//Define a Login Component
class Signup extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            name : "",
            email:"",
            password : "",
            loc:"",
            signed: false
            // authFlag : false,
            // cred:false
            
        }
        //Bind the handlers to this class
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.locationChangeHandler = this.locationChangeHandler.bind(this);
        this.submitSignup = this.submitSignup.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    // componentWillMount(){
    //     this.setState({
    //         authFlag : false
            
    //     })
    // }
    //username change handler to update state variable with the text entered by the user
    nameChangeHandler = (e) => {
        this.setState({
            name : e.target.value
        })
    }
    //username change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    locationChangeHandler = (e) => {
        this.setState({
            loc : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitSignup = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            name : this.state.name,
            email: this.state.email,
            password : this.state.password,
            loc: this.state.loc 
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        console.log("in frontend before axios");
        axios.post(environment.baseUrl+'/company/company_signup',data)
            .then(response => {
              //  console.log("Status Code : ",response.status);

              console.log("in frontend after response");

              console.log("response" + response.data.result)
              if (response.data.result) {
                  this.setState({
                    signed: true

                  })
                  //console.log("response" + response.data.result)


              } else if (response.data.error) {
                  this.setState({
                    signed: false
                  })
              }

                
            })
            .catch(
                this.setState({
                    signed: false
                
            }));
          
            

            
    }

    render(){
        let signvalue = null;

        
       if (this.state.signed==true){
        signvalue = <p> Sign-up successful</p>
       }
    //    if (this.state.signed==false){
    //     signvalue = <p>Sign-in not successful</p>
    //    }

           


        return(
            <div>
            <div class="container">
                
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Company Signup</h2>
                            <p>Please enter your details</p>
                        </div>
                            <div class="form-group">
                                <input onChange = {this.nameChangeHandler} type="text" class="form-control" name="name" placeholder="Name"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.emailChangeHandler} type="email" class="form-control" name="email" placeholder="Email"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.locationChangeHandler} type="text" class="form-control" name="loc" placeholder="Location"/>
                            </div>
                            <button onClick = {this.submitSignup} class="btn btn-primary">Signup</button>                 
                    </div>{signvalue}
                </div>

               
                    
            </div> 
            </div>
        )
    }
}
//export Login Component
export default Signup;