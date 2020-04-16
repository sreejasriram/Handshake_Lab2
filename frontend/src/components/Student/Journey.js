
import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import {environment} from '../../Utils/constants';
import { connect } from "react-redux";
import { editJourney } from "../../redux/actions/index";



class Journey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            career_objective: "",
           
            redirect: true,
            rerender: false
        }
        this.editProfile = this.editProfile.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    inputChangeHandler = (e) => {
        const value = e.target.value
        this.setState({
            [e.target.name]: value
        })
    }
    editProfile = (e) => {
        e.preventDefault();
        this.setState({
            redirect: true
        })
    }
    cancel = (e) => {
        e.preventDefault();
        this.setState({
            redirect: false
        })
    }
    componentWillReceiveProps(nextProps) {
            if (this.props.career_objective!==nextProps.profile.career_objective)
            this.setState({ career_objective:nextProps.profile.career_objective});
          
            

            if (nextProps.profile.career_objective) {
                this.setState({redirect:false})}



        }
    saveProfile = (e) => {
        e.preventDefault();
        let stud_id = sessionStorage.getItem('id');
        this.setState({
             redirect: false,
            rerender: false
        })
        const edit_data = {
            id: stud_id,
            career_objective: this.state.career_objective
        }
        console.log(edit_data)
        this.props.editJourney(edit_data)
        // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        // axios.post(environment.baseUrl+'/student/student_journey_edited', edit_data)
        //     .then(response => {
        //         console.log("in frontend after response");
        //         console.log(response.data.result)
        //         if (response.data.result) {
        //             this.setState({
                        
        //                 rerender: false,
        //                 career_objective: response.data.result.career_objective

        //             });
        //         } else if (response.data.error) {
        //             console.log("response" + response.data.error)
        //         }
        //     }
        //     )
    }


    render() {
        let renderRedirect = null;
      
        if (this.state.redirect === true){
            renderRedirect = (
                <div>
                    <Card>
                        <CardContent>
                        <Typography color="black" gutterBottom><b><p style={{ fontSize: '24px' }}>My Journey</p></b></Typography>
                            <div style={{ width: '70%' }} class="form-group">
                               <textarea  rows="4" cols="50" onChange={this.inputChangeHandler} type="text" class="form-control" name="career_objective" value={this.state.career_objective} placeholder="Type here.." />

                            </div>
                            <button onClick={this.saveProfile} class="btn btn-primary">save</button>&nbsp;
                            <button onClick={this.cancel} class="btn btn-primary" style={{backgroundColor:"#F7F7F7",color:"black"}}>Cancel</button>
                        </CardContent></Card><br /><br />
                </div>
            );


        }
        else if (this.state.redirect === false || this.state.rerender === true) {
                renderRedirect = 
                            <div>
                                    <Card>
                                        <CardContent>
                                        <div class="row">
                                            <div class="col-md-10">
                                            <Typography color="black" gutterBottom>
                                                <b><p style={{ fontSize: '24px' }}>My Journey</p></b>

                                            </Typography>
                                            </div>
                                            <div class="col-md-2">
                                            <CreateOutlinedIcon onClick={this.editProfile} style={{ alignContent: 'right',height:"15px",width:"15px" }}></CreateOutlinedIcon>
                                            </div>
                                            </div>
                                         <p>{this.state.career_objective?this.state.career_objective:""}</p>

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



// export default Journey;
const mapStateToProps = state => {
    return {
       

    };
};

function mapDispatchToProps(dispatch) {
    return {
        editJourney: payload => dispatch(editJourney(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Journey);