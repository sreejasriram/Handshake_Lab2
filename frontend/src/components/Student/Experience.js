import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import {environment} from '../../Utils/constants';




class Experience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            b_id: "",
            company: "",
            title: "",
            location: "",
            description: "",
            year_of_starting: "",
            month_of_starting: "",
            year_of_ending: "",
            month_of_ending: "",
            experience:[],
            redirect: true,
            rerender: false,
            addExp:false,
            existingEdit:false,
        }
        this.editProfile = this.editProfile.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.cancel = this.cancel.bind(this);
        this.addExperience = this.addExperience.bind(this);
        
    }
    
   
    inputChangeHandler = (e) => {
        const value = e.target.value
        this.setState({
            [e.target.name]: value
        })
    }
    editProfile = (e) => {
        e.preventDefault();
        const value = e.target.value
        let expData=this.state.experience;
        console.log(this.state.experience)
        expData.map((data, index) => {
            if (data._id===value){
            this.setState({
            company: data.company,
            title: data.title,
            location: data.location,
            description: data.description,
            year_of_starting: data.year_of_starting,
            month_of_starting: data.month_of_starting,
            year_of_ending: data.year_of_ending,
            month_of_ending: data.month_of_ending
            
            })
        }
        })
        this.setState({
            redirect: true,
            b_id:value,
            existingEdit:true
          

        })

    }
    cancel = (e) => {
        e.preventDefault();
        this.setState({
            redirect: false,
            addExp:false,
            existingEdit:false,
            b_id:""

        })
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.experience)
        if (this.props.experience!==nextProps.experience)
        this.setState({ experience:nextProps.experience});    
            if (this.state.experience.length) {
                    console.log("aaa")
                this.setState({redirect:false})}
        }


    saveProfile = (e) => {
        e.preventDefault();
        let stud_id = sessionStorage.getItem('id');
        this.setState({
             redirect: false,
            rerender: false,
            addExp:false,
            existingEdit:false
        })
        const edit_data = {
            id: stud_id,
            exp_id:this.state.b_id,
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            description: this.state.description,
            year_of_starting: this.state.year_of_starting,
            month_of_starting: this.state.month_of_starting,
            year_of_ending: this.state.year_of_ending,
            month_of_ending: this.state.month_of_ending

         
           
        }
        console.log(edit_data)
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        axios.post(environment.baseUrl+'/student/student_experience_edited', edit_data)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.result)
                if (response.data.result) {
                    this.setState({
                        
                        rerender: false,
                        b_id:"",
                        company: response.data.result.company,
                        title: response.data.result.title,
                        location: response.data.result.location,
                        description: response.data.result.description,
                        year_of_starting: response.data.result.year_of_starting,
                        month_of_starting: response.data.result.month_of_starting,
                        year_of_ending: response.data.result.year_of_ending,
                        month_of_ending: response.data.result.month_of_ending,
                        experience:response.data.result.experience

                    });
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                }
            }
            )
    }


    addExperience = (e) => {
       
        this.setState({
            addExp: true,
            b_id:""
        })
    }


    render() {
        let renderRedirect = null;
        let addExpData=null;
        console.log(this.state.experience)
        
        let expData=this.state.experience
        console.log("add exp")

console.log(this.state.addExp)
console.log("existing edit")
console.log(this.state.existingEdit)
console.log("redirect")
console.log(this.state.redirect)
console.log("rerender")
console.log(this.state.rerender)


        if(this.state.addExp===true){
            addExpData = (  
        <div>
            <Card>
                <CardContent>
                    <div style={{ width: '70%' }} class="form-group">
                        <input onChange={this.inputChangeHandler} type="text" class="form-control" name="company" value={this.state.company} placeholder="Company" /><br/>
                        <input onChange={this.inputChangeHandler} type="text" class="form-control" name="title" value={this.state.title} placeholder="Title" /><br/>
                        <input onChange={this.inputChangeHandler} type="text" class="form-control" name="location" value={this.state.location} placeholder="Location" /><br/>
                        <textarea onChange={this.inputChangeHandler} class="form-control" name="description" value={this.state.description} placeholder="Description" rows="3" cols="8" /><br/>
                        <div class="row">    
                        <div class="col-md-3">           
                        <input onChange={this.inputChangeHandler} type="number" class="form-control" name="year_of_starting" value={this.state.year_of_starting} placeholder="Start Year"  />                       
                        </div> <div class="col-md-3">
                        <input onChange={this.inputChangeHandler} type="number" class="form-control" name="month_of_starting" value={this.state.month_of_starting} placeholder="Start Month" min="1" max="12" />                       
                        </div> <div class="col-md-3">

                        <input onChange={this.inputChangeHandler} type="number" class="form-control" name="year_of_ending" value={this.state.year_of_ending} placeholder="End Year" />
                        </div> <div class="col-md-3">

                        <input onChange={this.inputChangeHandler} type="number" class="form-control" name="month_of_ending" value={this.state.month_of_ending} placeholder="End Month" min="1" max="12" />
                       </div> </div>    
                    </div>
                    <button onClick={this.saveProfile} class="btn btn-primary">save</button>&nbsp;
                    <button onClick={this.cancel} class="btn btn-primary" style={{backgroundColor:"#F7F7F7",color:"black"}}>Cancel</button>
                </CardContent></Card><br /><br />
        </div>
    );

}
else
{
    addExpData=
                <div class="row">
                <div class="col-md-10">
                    <Button color="primary" onClick={this.addExperience} style={{fontSize:"15px",left:"300px"}}>
                        Add Experience
                    </Button>
                </div>
                </div>
}



        if (this.state.redirect === true && this.state.existingEdit===false){
            renderRedirect = (
                <div>
                    <Card>
                        <CardContent>
                        <Typography color="black" gutterBottom><b><p style={{ fontSize: '24px' }}>Work Experience</p></b></Typography>
                        <div style={{ width: '70%' }} class="form-group">
                        <input onChange={this.inputChangeHandler} type="text" class="form-control" name="company" value={this.state.company} placeholder="Company" /><br/>
                        <input onChange={this.inputChangeHandler} type="text" class="form-control" name="title" value={this.state.title} placeholder="Title" /><br/>
                        <input onChange={this.inputChangeHandler} type="text" class="form-control" name="location" value={this.state.location} placeholder="Location" /><br/>
                        <textarea onChange={this.inputChangeHandler} class="form-control" name="description" value={this.state.description} placeholder="Description" rows="3" cols="8" /><br/>
                        <div class="row">    
                        <div class="col-md-3">           
                        <input onChange={this.inputChangeHandler} type="number" class="form-control" name="year_of_starting" value={this.state.year_of_starting} placeholder="Start Year"  />                       
                        </div> <div class="col-md-3">
                        <input onChange={this.inputChangeHandler} type="number" class="form-control" name="month_of_starting" value={this.state.month_of_starting} placeholder="Start Month" min="1" max="12" />                       
                        </div> <div class="col-md-3">

                        <input onChange={this.inputChangeHandler} type="number" class="form-control" name="year_of_ending" value={this.state.year_of_ending} placeholder="End Year" />
                        </div> <div class="col-md-3">

                        <input onChange={this.inputChangeHandler} type="number" class="form-control" name="month_of_ending" value={this.state.month_of_ending} placeholder="End Month" min="1" max="12" />
                       </div> </div>    
                    </div>
                            <button onClick={this.saveProfile} class="btn btn-primary">save</button>&nbsp;
                            <button onClick={this.cancel} class="btn btn-primary" style={{backgroundColor:"#F7F7F7",color:"black"}}>Cancel</button>
                        </CardContent></Card><br /><br />
                </div>
            );


        }
        // else if (this.state.redirect === false || this.state.rerender === true || this.state.existingEdit===true|| this.state.rerenderforExistingEdit === true) {
        else if (this.state.redirect === false || this.state.rerender === true || this.state.existingEdit===true) {
   
            renderRedirect = 
                            <div> 
                                    <Card>
                                        <CardContent>
                                       
                                            <Typography color="black" gutterBottom>
                                                <b><p style={{ fontSize: '24px' }}>Work Experience</p></b>
                                            </Typography>
                                        
                                        {expData.map((data, index) => {
                                            console.log("inside")
                                            console.log(data._id)
                                            console.log(this.state.b_id)

                                            if (data._id!=this.state.b_id)
                                            {
                                            return(
                                                
                                                <div class="row">
                                                <div class="col-md-10">
                                                <div key={data._id}>
                                                {data.company?(<div> <h4><b><WorkOutlineOutlinedIcon></WorkOutlineOutlinedIcon> {data.company}</b></h4></div>):<div></div>} 
                                        {data.title?(<div><PersonOutlinedIcon></PersonOutlinedIcon> {data.title}</div>):<div></div>} 
                                        {data.location?(<div><LocationOnOutlinedIcon></LocationOnOutlinedIcon> {data.location}</div>):<div></div>} 
                                        {data.year_of_starting?(<div><DateRangeOutlinedIcon></DateRangeOutlinedIcon> {data.year_of_starting?data.year_of_starting:""}/{data.month_of_starting?data.month_of_starting:""} - {data.year_of_ending?data.year_of_ending:""}/{data.month_of_ending?data.month_of_ending:""}</div>):<div></div>} 

                                            <hr/>
                                                 </div></div>
                                        <div class="col-md-2">
                                        <button onClick={this.editProfile} class="btn btn-primary" value={data._id} style={{backgroundColor:"#F7F7F7",color:"black"}}>edit</button>                                 
                                        </div>
                                        
                                            </div>)   }
                                        else
                                        {
                                            return(
                                                <div>
                                                    <Card>
                                                        <CardContent>
                                                        <div style={{ width: '70%' }} class="form-group">
                                                            <input onChange={this.inputChangeHandler} type="text" class="form-control" name="company" value={this.state.company} placeholder="Company" /><br/>
                                                            <input onChange={this.inputChangeHandler} type="text" class="form-control" name="title" value={this.state.title} placeholder="Title" /><br/>
                                                            <input onChange={this.inputChangeHandler} type="text" class="form-control" name="location" value={this.state.location} placeholder="Location" /><br/>
                                                            <textarea onChange={this.inputChangeHandler} class="form-control" name="description" value={this.state.description} placeholder="Description" rows="3" cols="8" /><br/>
                                                            <div class="row">    
                                                            <div class="col-md-3">           
                                                            <input onChange={this.inputChangeHandler} type="number" class="form-control" name="year_of_starting" value={this.state.year_of_starting} placeholder="Start Year"  />                       
                                                            </div> <div class="col-md-3">
                                                            <input onChange={this.inputChangeHandler} type="number" class="form-control" name="month_of_starting" value={this.state.month_of_starting} placeholder="Start Month" min="1" max="12" />                       
                                                            </div> <div class="col-md-3">

                                                            <input onChange={this.inputChangeHandler} type="number" class="form-control" name="year_of_ending" value={this.state.year_of_ending} placeholder="End Year" />
                                                            </div> <div class="col-md-3">

                                                            <input onChange={this.inputChangeHandler} type="number" class="form-control" name="month_of_ending" value={this.state.month_of_ending} placeholder="End Month" min="1" max="12" />
                                                        </div> </div>    
                                                        </div>
                                                            <button onClick={this.saveProfile} class="btn btn-primary">save</button>&nbsp;
                                                            <button onClick={this.cancel} class="btn btn-primary" style={{backgroundColor:"#F7F7F7",color:"black"}}>Cancel</button>
                                                        </CardContent></Card><br /><br />
                                                </div>
                                            )

                                        }                                       
                                          }
                                         )}             
                                       {addExpData}   
                                        </CardContent>
                                    </Card>
                                    <br /><br />                          
                        </div>          
        }
        return (
            <div>
                {renderRedirect}
            </div>
        )
    }
}
export default Experience;















