import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {environment} from '../../Utils/constants';


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
            canceled:false,
            job_id:this.props.match.params.jobId

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
        console.log(this.state.cat)
        console.log(cmpny_id)
        const data = {
            title : this.state.title,
            postingDate: this.state.postingDate,
            deadline : this.state.deadline,
            loc: this.state.loc,
            salary: this.state.salary,
            desc : this.state.desc,
            cat: this.state.cat,
            id: cmpny_id,
            job_id:this.state.job_id

        }
        // job_details.id,job_details.title,job_details.postingDate,job_details.deadline,
        //     job_details.loc,job_details.salary,job_details.desc,job_details.cat
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        console.log("in frontend before axios");
        axios.post(environment.baseUrl+'/company/save_edited_job',data)
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

    componentDidMount() {
        //  const jobId = props.match.params
        let cmpny_id = sessionStorage.getItem('id');
        
        const data = {
         
            id: cmpny_id,
            job_id:this.state.job_id
        }
        console.log(data)
          axios.post(environment.baseUrl+'/company/edit_job_retrieve',data)
              .then(response => {
                  console.log("in frontend after response");
                  console.log(response.data.rows)
                  if (response.data.rows) {
                      this.setState({
                          dataRetrieved: true,
                          jobData: response.data.rows,
                           title : response.data.rows[0].title,
                          postingDate: response.data.rows[0].posting_date,
                          deadline : response.data.rows[0].deadline,
                          loc: response.data.rows[0].loc,
                          salary: response.data.rows[0].salary,
                          desc : response.data.rows[0].jobDesc,
                          cat: response.data.rows[0].cat
                      });
                  } else if (response.data.error) {
                      console.log("response" + response.data.error)
  
                  }
  
  
              })
      }

    render(){
        let redirectVar = null;

        
       if (this.state.added==true || this.state.canceled==true){
        redirectVar = <Redirect to= "/home"/>

       }
       let jobData = this.state.jobData;
       console.log(jobData)
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
                                <input onChange = {this.inputChangeHandler} type="text" class="form-control" name="title" value={this.state.title} placeholder="Title"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="date" class="form-control" name="postingDate" value={this.state.postingDate} placeholder="Posting Date"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="date" class="form-control" name="deadline" value={this.state.deadline} placeholder="Deadline"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="text" class="form-control" name="loc" value={this.state.loc} placeholder="Location"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="number" class="form-control" name="salary" value={this.state.salary} placeholder="Salary"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.inputChangeHandler} type="text" class="form-control" name="desc" value={this.state.desc} placeholder="Description"/>
                            </div>
                            <div class="form-group">
                            Category: <select onChange = {this.inputChangeHandler} name="cat" value={this.state.cat}>
                                    <option value = "Internship">Internship</option>
                                    <option value = "Part-Time">Part time</option>
                                    <option value = "Full-Time">Full time</option>
                                    <option value = "On-Campus">On Campus</option>
                                </select>
                            </div>
                            <button onClick = {this.postJobs} class="btn btn-primary">Save Job</button> &nbsp;&nbsp; 
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