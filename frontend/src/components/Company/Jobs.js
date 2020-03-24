
import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import {environment} from '../../Utils/constants';


const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

//Define a Login Component
class Jobs extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            title : "",
            postingDate: "",
            deadline : "",
            loc: "",
            salary: "",
            desc : "",
            cat: "",
            added: false,
            canceled:false

            //id: this.props.location.state.id
            // authFlag : false,
            // cred:false
            
        }
        //Bind the handlers to this class
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
       
        this.postJobs = this.postJobs.bind(this);
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
        console.log(e.target.name)

        console.log(e.target.value)
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
    postJobs = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        let cmpny_id = sessionStorage.getItem('id');
        console.log(cmpny_id)
        const data = {
            title : this.state.title,
            postingDate: this.state.postingDate,
            deadline : this.state.deadline,
            loc: this.state.loc,
            salary: this.state.salary,
            desc : this.state.desc,
            cat: this.state.cat,
            id: cmpny_id

        }
        console.log(data)
     
        axios.defaults.withCredentials = true;
       
        console.log("in frontend before axios");
        axios.post(environment.baseUrl+'/company/company_jobs',data)
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
        redirectVar = <Redirect to= "/home"/>
       }
        return(
            <div>
            <div class="container">
            {redirectVar}
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Job Posting </h2>
                            <p>Please enter Job details</p>
                        </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="text" class="form-control" name="title" placeholder="Title"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="date" class="form-control" name="postingDate"  placeholder="Posting Date"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="date" class="form-control" name="deadline" placeholder="Deadline"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="text" class="form-control" name="loc" placeholder="Location"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="number" class="form-control" name="salary" placeholder="Salary"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="text" class="form-control" name="desc" placeholder="Description"/>
                            </div>
                            <div class="form-group">
                            Category: <select onChange = {this.inputChangeHandler} name="cat">
                                    <option value = "Internship">Internship</option>
                                    <option value = "Part-Time">Part time</option>
                                    <option value = "Full-Time">Full time</option>
                                    <option value = "On-Campus">On Campus</option>
                                </select>
                            </div>
                            <button onClick = {this.postJobs} class="btn btn-primary">Post Job</button> &nbsp;&nbsp; 
                            <button onClick={this.cancel} class="btn btn-primary">Cancel</button>                            
                    </div>

                </div>

               
                    
            </div> 
            </div>
        )
    }
}
//export Login Component
export default Jobs;