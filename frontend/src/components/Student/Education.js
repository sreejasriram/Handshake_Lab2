
import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import {environment} from '../../Utils/constants';
import { connect } from "react-redux";
import { editEducation } from "../../redux/actions/index";


class Education extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
                    b_id: "",
                    college_name: "",
                    location: "",
                    degree: "",
                    major: "",
                    cgpa: "",
                    year_of_starting: "",
                    month_of_starting: "",
                    year_of_passing: "",
                    month_of_passing: "",
            
            education:[],
            redirect: true,
            rerender: false,
            addEdu:false,
            existingEdit:false,
        }
        this.editProfile = this.editProfile.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.cancel = this.cancel.bind(this);
        this.addEducation = this.addEducation.bind(this);
        
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
        let eduData=this.state.education;
        console.log(this.state.education)
        eduData.map((data, index) => {
            if (data._id===value){
            this.setState({
            college_name: data.college_name,
            location: data.location,
            degree: data.degree,
            major: data.major,
            cgpa: data.cgpa,
            year_of_starting: data.year_of_starting,
            month_of_starting: data.month_of_starting,
            year_of_passing: data.year_of_passing,
            month_of_passing: data.month_of_passing
            
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
            addEdu:false,
            existingEdit:false,
            b_id:""

        })
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.profile.education)
        if (this.props.education!==nextProps.profile.education)
        this.setState({ education:nextProps.profile.education});    
            if (nextProps.profile.education.length) {
                    console.log("aaa")
                this.setState({redirect:false})}
        }


    saveProfile = (e) => {
        e.preventDefault();
        let stud_id = sessionStorage.getItem('id');
        this.setState({
             redirect: false,
            rerender: false,
            addEdu:false,
            existingEdit:false
        

        })
        const edit_data = {
            id: stud_id,
            edu_id:this.state.b_id,
            college_name: this.state.college_name,
            location: this.state.location,
            degree: this.state.degree,
            major: this.state.major,
            cgpa: this.state.cgpa,
            year_of_starting: this.state.year_of_starting,
            month_of_starting: this.state.month_of_starting,
            year_of_passing: this.state.year_of_passing,
            month_of_passing: this.state.month_of_passing
           
        }
        console.log(edit_data)
     
        this.props.editEducation(edit_data)
           ///
           this.setState({
            b_id:""
       })
/////////////
        // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        // axios.post(environment.baseUrl+'/student/student_education_edited', edit_data)
        //     .then(response => {
        //         console.log("in frontend after response");
        //         console.log(response.data.result)
        //         if (response.data.result) {
        //             this.setState({
                        
        //                 rerender: false,
        //                 b_id:"",
        //                 college_name: response.data.result.college_name,
        //                 location: response.data.result.location,
        //                 degree: response.data.result.degree,
        //                 major: response.data.result.major,
        //                 cgpa: response.data.result.cgpa,
        //                 year_of_starting: response.data.result.year_of_starting,
        //                 month_of_starting: response.data.result.month_of_starting,
        //                 year_of_passing: response.data.result.year_of_passing,
        //                 month_of_passing: response.data.result.month_of_passing,
        //                 education:response.data.result.education

        //             });
        //         } else if (response.data.error) {
        //             console.log("response" + response.data.error)
        //         }
        //     }
        //     )
    }


    addEducation = (e) => {
       
        this.setState({
            addEdu: true,
            b_id:"",
            college_name: "",
            location: "",
            degree: "",
            major: "",
            cgpa: "",
            year_of_starting: "",
            month_of_starting: "",
            year_of_passing: "",
            month_of_passing: ""
        })
    }


    render() {
        let renderRedirect = null;
        let addEduData=null;
        console.log(this.state.education)
        
        let eduData=this.state.education
        console.log("add edu")

console.log(this.state.addEdu)
console.log("existing edit")
console.log(this.state.existingEdit)
console.log("redirect")

console.log(this.state.redirect)
console.log("rerender")

console.log(this.state.rerender)


        if(this.state.addEdu===true){
             addEduData = (
        <div>
            <Card>
                <CardContent>
                    <div style={{ width: '70%' }} class="form-group">
                        <input onChange={this.inputChangeHandler} type="text" class="form-control" name="college_name" value={this.state.college_name} placeholder="School/College Name" /><br/>
                        <input onChange={this.inputChangeHandler} type="text" class="form-control" name="location" value={this.state.location} placeholder="Location" /><br/>
                        <input onChange={this.inputChangeHandler} type="text" class="form-control" name="degree" value={this.state.degree} placeholder="Degree" /><br/>
                        <input onChange={this.inputChangeHandler} type="text" class="form-control" name="major" value={this.state.major} placeholder="Major" /><br/>
                        <input onChange={this.inputChangeHandler} type="text" class="form-control" name="cgpa" value={this.state.cgpa} placeholder="CGPA" /><br/>   
                        <div class="row">    
                        <div class="col-md-3">           
                        <input onChange={this.inputChangeHandler} type="number" class="form-control" name="year_of_starting" value={this.state.year_of_starting} placeholder="Start Year"  />                       
                        </div> <div class="col-md-3">
                        <input onChange={this.inputChangeHandler} type="number" class="form-control" name="month_of_starting" value={this.state.month_of_starting} placeholder="Start Month" min="1" max="12" />                       
                        </div> <div class="col-md-3">

                        <input onChange={this.inputChangeHandler} type="number" class="form-control" name="year_of_passing" value={this.state.year_of_passing} placeholder="End Year" />
                        </div> <div class="col-md-3">

                        <input onChange={this.inputChangeHandler} type="number" class="form-control" name="month_of_passing" value={this.state.month_of_passing} placeholder="End Month" min="1" max="12" />
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
    addEduData=
                <div class="row">
                <div class="col-md-10">
                    <Button color="primary" onClick={this.addEducation} style={{fontSize:"15px",left:"300px"}}>
                        Add School
                    </Button>
                </div>
                </div>
}



        if (this.state.redirect === true && this.state.existingEdit===false){
            renderRedirect = (
                <div>
                    <Card>
                        <CardContent>
                        <Typography color="black" gutterBottom><b><p style={{ fontSize: '24px' }}>Education Details</p></b></Typography>
                            <div style={{ width: '70%' }} class="form-group">
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="college_name" value={this.state.college_name} placeholder="School/College Name" /><br/>
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="location" value={this.state.location} placeholder="Location" /><br/>
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="degree" value={this.state.degree} placeholder="Degree" /><br/>
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="major" value={this.state.major} placeholder="Major" /><br/>
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="cgpa" value={this.state.cgpa} placeholder="CGPA" /><br/>
                                <div class="row">    
                        <div class="col-md-3">  
                                <input onChange={this.inputChangeHandler} type="number" class="form-control" name="year_of_starting" value={this.state.year_of_starting} placeholder="Start Year" /><br/>
                                </div>  <div class="col-md-3">
                                <input onChange={this.inputChangeHandler} type="number" class="form-control" name="month_of_starting" value={this.state.month_of_starting} placeholder="Start Month" min="1" max="12" /><br/>
                                </div>  <div class="col-md-3">
                                <input onChange={this.inputChangeHandler} type="number" class="form-control" name="year_of_passing" value={this.state.year_of_passing} placeholder="End Year" /><br/>
                                </div>  <div class="col-md-3">
                                <input onChange={this.inputChangeHandler} type="number" class="form-control" name="month_of_passing" value={this.state.month_of_passing} placeholder="End Month" min="1" max="12" /><br/>
                            </div></div>
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
                                                <b><p style={{ fontSize: '24px' }}>Education Details</p></b>
                                            </Typography>
                                        
                                        {eduData.map((data, index) => {
                                            console.log("inside")
                                            console.log(data._id)
                                            console.log(this.state.b_id)

                                            if (data._id!=this.state.b_id)
                                            {
                                            return(
                                                
                                                <div class="row">
                                                <div class="col-md-10">
                                                <div key={data._id}>
                                                {data.college_name?(<div><b><SchoolRoundedIcon></SchoolRoundedIcon> {data.college_name}</b></div>):<div></div>} 
                                                {data.degree?(<div><GradeOutlinedIcon></GradeOutlinedIcon> {data.degree}</div>):<div></div>} 
                                                <div> {data.year_of_starting?data.year_of_starting:""}/{data.month_of_starting?data.month_of_starting:""}-{data.year_of_passing?data.year_of_passing:""}/{data.month_of_passing?data.month_of_passing:""}</div>
                                                {data.major?(<div><b>Major in</b> {data.major}</div>):<div></div>} 
                                                {data.cgpa?(<div><b>Cummulative GPA</b> {data.cgpa}</div>):<div></div>}
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
                                                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="college_name" value={this.state.college_name} placeholder="School/College Name" /><br/>
                                                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="location" value={this.state.location} placeholder="Location" /><br/>
                                                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="degree" value={this.state.degree} placeholder="Degree" /><br/>
                                                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="major" value={this.state.major} placeholder="Major" /><br/>
                                                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="cgpa" value={this.state.cgpa} placeholder="CGPA" /><br/>
                                                                <div class="row">
                                                                <div class="col-md-3">
                                                                <input onChange={this.inputChangeHandler} type="number" class="form-control" name="year_of_starting" value={this.state.year_of_starting} placeholder="Start Year" /><br/>
                                                               </div>  <div class="col-md-3">
                                                                <input onChange={this.inputChangeHandler} type="number" class="form-control" name="month_of_starting" value={this.state.month_of_starting} placeholder="Start Month" min="1" max="12" /><br/>
                                                                </div>  <div class="col-md-3">
                                                                <input onChange={this.inputChangeHandler} type="number" class="form-control" name="year_of_passing" value={this.state.year_of_passing} placeholder="End Year" /><br/>
                                                                </div>  <div class="col-md-3">
                                                                <input onChange={this.inputChangeHandler} type="number" class="form-control" name="month_of_passing" value={this.state.month_of_passing} placeholder="End Month" min="1" max="12" /><br/>
                                                            </div></div>
                                                            </div>
                                                            <button onClick={this.saveProfile} class="btn btn-primary">save</button>&nbsp;
                                                            <button onClick={this.cancel} class="btn btn-primary" style={{backgroundColor:"#F7F7F7",color:"black"}}>Cancel</button>
                                                        </CardContent></Card><br /><br />
                                                </div>
                                            )

                                        }                                       
                                          }
                                         )}             
                                       {addEduData}   
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
// export default Education;
const mapStateToProps = state => {
    return {
       

    };
};

function mapDispatchToProps(dispatch) {
    return {
        editEducation: payload => dispatch(editEducation(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Education);