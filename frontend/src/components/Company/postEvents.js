
import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {environment} from '../../Utils/constants';


//Define a Login Component
class postEvents extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            name: "",
            desc: "",
            time: "",
            date: "",
            loc: "",
            elig: "",
            added: false,
            canceled:false
            //id: this.props.location.state.id
            // authFlag : false,
            // cred:false
            
        }
        //Bind the handlers to this class
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
       
        this.postTheEvent = this.postTheEvent.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    // componentWillMount(){
    //     this.setState({
    //         authFlag : false
            
    //     })
    // }
    //username change handler to update state variable with the text entered by the user
    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    cancel = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
     //   window.history.back();
     this.setState({
        canceled: true
      })
    

    }
    //submit Login handler to send a request to the node backend
    postTheEvent = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        let cmpny_id = sessionStorage.getItem('id');
        console.log(cmpny_id)
        const data = {
            name: this.state.name,
            desc: this.state.desc,
            time: this.state.time,
            date: this.state.date,
            loc: this.state.loc,
            elig: this.state.elig,
            id: cmpny_id

        }
       
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        console.log("in frontend before axios");
        axios.post(environment.baseUrl+'/company/company_events',data)
            .then(response => {
              //  console.log("Status Code : ",response.status);

              console.log("in frontend after response");

              console.log("response" + response.data.result)
              if (response.data.result) {
                  this.setState({
                    added: true

                  })
                  //console.log("response" + response.data.result)


              } else if (response.data.error) {
                  this.setState({
                    added: false
                  })
              }

                
            })
            
    }

    render(){
        let redirectVar = null;

        
       if (this.state.added==true || this.state.canceled==true){
        redirectVar = <Redirect to= "/events"/>

       }
        return(
            <div>
            <div class="container">
            {redirectVar}
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Event Posting </h2>
                            <p>Please enter Event details</p>
                        </div>
                        {/* name: this.state.name,
            eventDesc: this.state.eventDesc,
            time: this.state.time,
            date: this.state.date,
            loc: this.state.loc,
            Elig: this.state.Elig, */}
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="text" class="form-control" name="name" placeholder="Name"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="text" class="form-control" name="desc"  placeholder="Description"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="time" class="form-control" name="time" placeholder="Time"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="date" class="form-control" name="date" placeholder="Date"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="text" class="form-control" name="loc" placeholder="Location"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="text" class="form-control" name="elig" placeholder="Eligibility"/>
                            </div>
                           
                            {/* <div class="form-group">
                            Eligibility: <select onChange = {this.inputChangeHandler} name="elig">
                                    <option value = "intern">Internship</option>
                                    <option value = "part">Part time</option>
                                    <option value = "full">Full time</option>
                                    <option value = "oncampus">On Campus</option>
                                </select>
                            </div> */}
                            <button onClick = {this.postTheEvent} class="btn btn-primary">Post Event</button> &nbsp;&nbsp; 
                            <button onClick={this.cancel} class="btn btn-primary">Cancel</button>            
                    </div>

                </div>

               
                    
            </div> 
            </div>
        )
    }
}
//export Login Component
export default postEvents;