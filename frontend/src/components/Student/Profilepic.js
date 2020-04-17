import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import {Card,Avatar} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import {environment} from '../../Utils/constants';
import emptyPic from '../../images/empty-profile-picture.png';
import { connect } from "react-redux";
import { editProfilePic,uploadStudentPicture } from "../../redux/actions/index";


class Profilepic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            degree: "",
            college:"",
            major:"",
            image:"",
            redirect: true,
            rerender: false,
            emptyprofilepic:emptyPic,

        }
        this.editProfile = this.editProfile.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.showProfilepic = this.showProfilepic.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    inputChangeHandler = (e) => {
        const value = e.target.value
        this.setState({
            [e.target.name]: value
        })
    }

    showProfilepic = async (e) => {
        this.setState({
            image : e.target.files[0]
        })
        e.preventDefault();
        const formData = new FormData();
        formData.append('studentId', sessionStorage.getItem('id'))
        formData.append('image', e.target.files[0]);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        
        await this.props.uploadStudentPicture(formData, config);
        // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        // await axios.post(environment.baseUrl+"/student/uploadpic",formData, config)
        //     .then((response) => {
        //         this.setState({
        //             image:response.data.image
        //         })
        //     }).catch((error) => {
        //     });
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
            if (this.props.name!==nextProps.profile.name)
            this.setState({ name:nextProps.profile.name});
            if (this.props.degree!==nextProps.profile.degree)
            this.setState({ degree:nextProps.profile.degree});
            if (this.props.college!==nextProps.profile.college)
            this.setState({ college:nextProps.profile.college});
            if (this.props.major!==nextProps.profile.major)
            this.setState({ major:nextProps.profile.major});
            
            if (this.props.image!==nextProps.profile.image)
            this.setState({ image:nextProps.profile.image});
            
            if (nextProps.profile.name || nextProps.profile.degree || nextProps.profile.college || nextProps.profile.major || nextProps.profile.image) {
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
            name: this.state.name
        }
        console.log(edit_data)
        this.props.editProfilePic(edit_data)

        // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        // axios.post(environment.baseUrl+'/student/student_profilepic_edited', edit_data)
        //     .then(response => {
        //         console.log("in frontend after response");
        //         console.log(response.data.result)
        //         if (response.data.result) {
        //             this.setState({  
        //                 rerender: false,
        //                 name: response.data.result.name,
        //                 degree: response.data.result.degree,
        //                 major: response.data.result.major,
        //                 college: response.data.result.college,
        //                 image: response.data.result.image
        //             });
        //         } else if (response.data.error) {
        //             console.log("response" + response.data.error)
        //         }
        //     }
        //     )
    }


    render() {
        let renderRedirect = null;
      
            // if (this.state.redirect === true || (dob==undefined && city==undefined && state==undefined && country==undefined)) {
        if (this.state.redirect === true){
            renderRedirect = (
                <div>
                    <Card>
                        <CardContent>
                            
                        <Typography color="black" gutterBottom><b><p style={{ fontSize: '24px' }}>Profile</p></b></Typography>
                            <div class="upload-btn-img">
                                <Avatar src={this.state.image} class="img-thumbnail p-0 m-0" style={{ width: '104px', height: '104px', borderRadius: '50%', textAlign: 'center' }} alt="Student"></Avatar>
                                <input type="file" name="image" onChange={this.showProfilepic} />
                        </div>
                            <div style={{ width: '70%' }} class="form-group">
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="name" value={this.state.name} placeholder="Name" />
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
                                            <center>
                                        <div class="row">
                                            <div class="col-md-10">
                                            <Avatar src={this.state.image?this.state.image:this.state.emptyprofilepic} style={{ width: '104px', height: '104px', borderRadius: '50%', textAlign: 'center' }}></Avatar>
                                           
                                            </div>
                                            <div class="col-md-2">
                                            <CreateOutlinedIcon onClick={this.editProfile} style={{ alignContent: 'right',height:"15px",width:"15px" }}></CreateOutlinedIcon>
                                            </div>
                                            </div>
                                            <Typography color="black" gutterBottom>
                                            <h4><b>{this.state.name?this.state.name:""}</b></h4>
                                            </Typography>
                                            <p>{this.state.college?this.state.college:""}</p>
                                            <p>{this.state.degree?this.state.degree:""} {this.state.major?this.state.major:""} </p>
                                            <p>{this.state.cgpa?this.state.cgpa:""} </p>
                                            </center>
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

// export default Profilepic;
const mapStateToProps = state => {
    return {
       

    };
};

function mapDispatchToProps(dispatch) {
    return {
        editProfilePic: payload => dispatch(editProfilePic(payload)),
        uploadStudentPicture: payload => dispatch(uploadStudentPicture(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profilepic);



