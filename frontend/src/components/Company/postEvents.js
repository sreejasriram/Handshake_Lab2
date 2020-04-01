
import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {environment} from '../../Utils/constants';


class postEvents extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            description: "",
            time: "",
            date: "",
            location: "",
            eligibility: "",
            added: false,
            canceled:false    
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.postTheEvent = this.postTheEvent.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    cancel = (e) => {
        var headers = new Headers();
        e.preventDefault();
     this.setState({
        canceled: true
      })
    }

    postTheEvent = (e) => {
        var headers = new Headers();
        e.preventDefault();
        let cmpny_id = sessionStorage.getItem('id');
        console.log(cmpny_id)
        const data = {
            name: this.state.name,
            description: this.state.description,
            time: this.state.time,
            date: this.state.date,
            location: this.state.location,
            eligibility: this.state.eligibility,
            companyId: cmpny_id

        }
       
        axios.defaults.withCredentials = true;
        console.log("in frontend before axios");
        // axios.post(environment.baseUrl+'/company/company_events',data)
        axios.post(environment.baseUrl+'/company/post_events',data)
            .then(response => {
              console.log("in frontend after response");
              console.log("response" + response.data.result)
              if (response.data.result) {
                  this.setState({
                    added: true
                  })
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
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="text" class="form-control" name="name" placeholder="Name"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="text" class="form-control" name="description"  placeholder="Description"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="time" class="form-control" name="time" placeholder="Time"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="date" class="form-control" name="date" placeholder="Date"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="text" class="form-control" name="location" placeholder="Location"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="text" class="form-control" name="eligibility" placeholder="Eligibility"/>
                            </div>
                            <button onClick = {this.postTheEvent} class="btn btn-primary">Post Event</button> &nbsp;&nbsp; 
                            <button onClick={this.cancel} class="btn btn-primary">Cancel</button>            
                    </div>
                </div>          
            </div> 
            </div>
        )
    }
}
export default postEvents;