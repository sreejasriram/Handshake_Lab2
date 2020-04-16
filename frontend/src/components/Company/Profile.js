import React, { Component } from 'react';
import axios from 'axios';
import '../../App.css';
import { Card, CardContent, Button } from '@material-ui/core/';
import Company_Logo from '../../images/Cover_Letter_Social.jpg'
import {environment} from '../../Utils/constants'
import emptyPic from '../../images/empty-profile-picture.png';
import { connect } from "react-redux";
import { fetchCompanyProfile } from "../../redux/actions/index";

    class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            companyId: sessionStorage.getItem('id'),
            profile:null,
            editprofile:false,

            companyname:"",
            location:"",
            email:"",
            phone:"",
            companydesc:"",
            image:emptyPic
        }
        this.editProfile = this.editProfile.bind(this);
        this.fetchCompanydetails = this.fetchCompanydetails.bind(this);
    }
    inputChangeHandler = (e) => {
        const value = e.target.value
        this.setState({
            [e.target.name]: value
        })
    }
    componentDidMount(){
        this.fetchCompanydetails()
    }
    fetchCompanydetails(){
        console.log(sessionStorage.getItem('id'))
        this.props.fetchCompanyProfile();
        

        // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        // axios.get(environment.baseUrl+'/company/profile/' + sessionStorage.getItem('id'))
        //     .then((response) => {
        //             console.log(response.data)
        //         this.setState({
        //             profile : response.data.rows[0],
        //             companyname:response.data.rows[0].name,
        //             location:response.data.rows[0].location,
        //             email:response.data.rows[0].email,
        //             phone:response.data.rows[0].contact,
        //             companydesc:response.data.rows[0].description,
        //             image:response.data.rows[0].image
        //         })
        //         console.log(this.state.profile)
        //         console.log(this.state.companydesc)
        //     })
    }
    editProfile = () => {
        let profile = this.props.profile
        if (profile.length){
        profile=profile[0]
        this.setState({
        companyname:profile.name,
        location:profile.location,
        email:profile.email,
        phone:profile.contact,
        companydesc:profile.description,
        image:profile.image
    })
}
        this.setState(currentState =>({
            editprofile: !currentState.editprofile
           
        }))
    }
    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };
    showProfilepic = async (e) => {
        console.log("profilepic")
        this.setState({
            image : e.target.files[0]
        })
        e.preventDefault();
        const formData = new FormData();
        formData.append('companyId', sessionStorage.getItem('id'))
        formData.append('profilepic', e.target.files[0]);
      
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        let rest = await axios.post(environment.baseUrl+"/company/uploadpic",formData, config)
            .then((response) => {
                this.fetchCompanydetails();
                this.setState({
                    openimage: false,
                    file:null
                })
            }).catch((error) => {
            });
    }
    saveProfile = () =>{
        console.log(this.state.companydesc)
        let data={
            'company_id':sessionStorage.getItem('id'),
            'name':this.state.companyname,
            'location':this.state.location,
            'email':this.state.email,
            'phone':this.state.phone,
            'company_description':this.state.companydesc
        }
        console.log(data)
        // this.props.saveCompanyProfile(data);

        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        axios.put(environment.baseUrl+'/company/updateprofile', data)
            .then((response)=>{
                console.log(response.data)
                if (response.data.result) {
                    this.editProfile()
                    this.fetchCompanydetails()
                    console.log(response.data.result)
                } else {
                    console.log(response.data.error)
                }
            })
    }
    render(){
        let companyEdit = null;
        let profile=this.props.profile
        if (profile.length){
            console.log(this.state.editprofile)
        if(this.state.editprofile === true){
            // redirectVar = <Redirect to= "/company/events"/>}
            companyEdit = (
                <div>
                <Card style={{borderTopRightRadius:'0px',borderTopLeftRadius:'0px'}}>
                            <CardContent><div style ={{paddingTop:'30px'}}>
                                {/* <img src = {Company_Logo} alt = 'Logo' height='70' width='70' ></img> */}
                                <div class="upload-btn-img">
                                    <img src={this.state.image} height='70' width='70' class="img-thumbnail1 p-0 m-0" alt="Company"/>
                                    {/* <Avatar src={this.state.image} style={{ width: '104px', height: '104px', borderRadius: '0%' }} class="img-thumbnail1 p-0 m-0" alt="Company"></Avatar> */}

                                    <input type="file" name="image" onChange={this.showProfilepic} />
                                </div>
                                <div style = {{position:'relative', top:'-95px',left:'85px',marginTop:'20px'}}>
                                    <div className="col-md-8">
                                        <div class="form-group">
                                        <div class="active-pink-4 mb-4" style={{ width: "50%",float:"left"}}>
                                            <div style={{fontSize : "12px", marginTop:'15px',marginBottom:"7px"}}>Company Name</div>
                                            <input class="form-control" type="text"  name="companyname" value = {this.state.companyname} style={{ width: "80%"}} placeholder="Company Name" aria-label="Company Name" onChange={this.inputChangeHandler}/>
                                        </div> 
                                        <div class="active-pink-4 mb-4" style={{ width: "50%",float:"right"}}>
                                            <div style={{fontSize : "12px", marginTop:'15px',marginBottom:"7px"}}>Location</div>
                                            <input class="form-control" type="text"  name="location" value = {this.state.location} style={{ width: "80%"}} placeholder="Location" aria-label="Location" onChange={this.inputChangeHandler}/>
                                        </div> 
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <Button variant="contained" size="small" color="primary" style = {{position:'relative',top:'-70px',left:'150px', backgroundColor : "#1569E0", width:'2px', marginRight:'10px' }} onClick={()=>{console.log("save");this.saveProfile()}}>Save</Button>
                                        <Button variant="contained" size="small" color="primary" style = {{position:'relative',top:'-70px',left:'150px', backgroundColor : "#808080", width:'2px'}} onClick={()=>{this.editProfile()}}>Cancel</Button>
                                    </div></div>
                            </CardContent>
                        </Card>
                        <div style = {{marginTop : '20px', width:'103%',position:'relative',left:'-14px'}}>
                        <div className="col-md-8">
                        <Card>
                            <CardContent>
                                <h4>{'About ' + this.state.companyname}</h4>
                                <textarea name="companydesc" rows="4" cols="80" style={{borderRadius:'5px'}}  onChange={this.inputChangeHandler}>
                                    {this.state.companydesc}
                                </textarea>
                            </CardContent>
                        </Card>
                        </div>
                        <div className="col-md-4">
                        <Card>
                            <CardContent>
                                <h4>Contact Information</h4>
                                <div class="form-group">
                                    <div class="active-pink-4 mb-4" style={{ width: "90%",marginBottom:"15px",marginTop:"20px"}}>
                                        <div style={{fontSize : "12px", marginTop:'15px',marginBottom:"7px"}}>Email</div>
                                        <input class="form-control" type="text"  name="email" value = {this.state.email} style={{ width: "80%" }} placeholder="Email" aria-label="Company Name" onChange={this.inputChangeHandler}/>
                                    </div> 
                                    <div class="active-pink-4 mb-4" style={{ width: "90%"}}>
                                        <div style={{fontSize : "12px", marginTop:'15px',marginBottom:"7px"}}>Phone</div>
                                        <input class="form-control" type="text"  name="phone" value = {this.state.phone} style={{ width: "80%" }} placeholder="Phone" aria-label="Location" onChange={this.inputChangeHandler}/>
                                    </div> 
                                </div>
                            </CardContent>
                        </Card>
                     </div>
                     </div>
                    </div>)
        }
        else{
        companyEdit = (
            <div>
            <Card style={{borderTopRightRadius:'0px',borderTopLeftRadius:'0px'}}>
                        <CardContent><div style ={{paddingTop:'30px'}}>
                            <img src = {profile[0].image} alt = 'Logo' height='70' width='70' ></img>
                            {/* <Avatar src = {this.state.profile.image} alt = 'Logo' height='104' width='104' ></Avatar> */}

                            <div style = {{position:'relative', top:'-70px',left:'85px'}}>
                                <div className="col-md-9">
                                    <div><h4>{profile[0].name}</h4></div>
                                    <div className="col-md-7" style={{marginLeft:"-10px",marginTop:"7px"}}><span class="glyphicon glyphicon-map-marker" style={{color: "Black" }}></span> {profile[0].location}</div>
                                    <div className="col-md-3" style={{marginLeft:"-10px",marginTop:"7px"}}><span class="glyphicon glyphicon-envelope" style={{color: "Black" }}></span> {profile[0].email}</div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <Button variant="contained" size="small" color="primary" style = {{position:'relative',top:'-70px',left:'150px', backgroundColor : "#1569E0",width:'2px' }} onClick={()=>{this.editProfile()}}>Edit</Button>
                                </div></div>
                        </CardContent>
                    </Card>
                    <div style = {{marginTop : '20px', width:'103%',position:'relative',left:'-14px'}}>
                    <div className="col-md-8">
                    <Card>
                        <CardContent>
                            <h4>{'About ' + profile[0].name}</h4>
                            {profile[0].description}
                        </CardContent>
                    </Card>
                    </div>
                    <div className="col-md-4">
                    <Card>
                        <CardContent>
                            <h4>Contact Information</h4>
                            <div style={{fontSize : "12px", marginTop:'15px'}}>Email</div>
                            <div style={{color: "#1569E0"}}><span class="glyphicon glyphicon-envelope" style={{color: "Black" }}></span>  {profile[0].email}</div>
                            <div style={{fontSize : "12px", marginTop:'10px'}}>Phone</div>
                            <div style={{color: "#1569E0"}}><span class="glyphicon glyphicon-earphone" style={{color: "Black" }}></span>  {profile[0].contact}</div>
                        </CardContent>
                    </Card>
                 </div>
                 </div>
                </div>)
        }
        }
        return(
            <div style={{width:'90%',paddingLeft:'120px'}}>
                <Card>
                    <div style={{height:"200px"}}>
                        <img src={Company_Logo}></img>
                    </div>
                </Card>
                {companyEdit}
                
            </div>
        )
    }
}
// export default Profile;
const mapStateToProps = state => {
    console.log(state.companyProfile)
    
    return {
        profile:state.companyProfile
    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
        fetchCompanyProfile: payload => dispatch(fetchCompanyProfile(payload))
        // saveCompanyProfile: payload => dispatch(saveCompanyProfile(payload))       
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Profile);


///////////////////