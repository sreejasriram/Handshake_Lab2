
import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import Jobs from './Jobs';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import {environment} from '../../Utils/constants';



//Define a Login Component
class Profile extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            name: "",
            loc: "",
            desc: "",
            contact: "",
            // id: this.props.location.state.id,
            dataRetrieved: false,
            redirect: false,
            profileData: [],
            rerender:false

            // name, location, description, contact information,
        }
        this.editProfile = this.editProfile.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.cancel = this.cancel.bind(this);

    }


    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    editProfile = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        this.setState({
            redirect: true

        })
    }
    cancel = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
     //   window.history.back();
     this.setState({
      redirect:false
      })
    

    }
    saveProfile = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        let cmpny_id = sessionStorage.getItem('id');
        this.setState({
            redirect: false,
            rerender: false


        })
        const edit_data = {
            id: cmpny_id,
            name: this.state.name,
            loc: this.state.loc,
            desc: this.state.desc,
            contact: this.state.contact
        }
        axios.post(environment.baseUrl+'/company/save_company_profile', edit_data)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                if (response.data.rows) {
                    this.setState({
                        rerender: true

                    });
                    // console.log(response.data.rows[0].title)
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                }
            })

        const data = {
            id: cmpny_id
        }

        axios.post(environment.baseUrl+'/company/company_profile', data)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                if (response.data.rows) {
                    this.setState({
                        dataRetrieved: true,
                        profileData: response.data.rows,
                        rerender: true

                    });
                    // console.log(response.data.rows[0].title)
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                }
            })
    }
    
    componentDidMount() {
        let cmpny_id = sessionStorage.getItem('id');
        const data = {
            id: cmpny_id,
            name: "",
            loc: "",
            desc: "",
            contact: "",
        }

        axios.post(environment.baseUrl+'/company/company_profile', data)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                if (response.data.rows) {
                    this.setState({
                        dataRetrieved: true,
                        profileData: response.data.rows,
                        name: response.data.rows[0].name,
                        loc: response.data.rows[0].loc,
                        desc: response.data.rows[0].cmpyDesc,
                        contact: response.data.rows[0].contact
                    });
                    // console.log(response.data.rows[0].title)
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                }
            })
    }


    render() {
        let renderRedirect = null;
        let redirectVar = null;
        let profileData = this.state.profileData;
  
        if (this.state.redirect === true || profileData.length==0) {
            renderRedirect = (
            <div>
                    <input onChange={this.inputChangeHandler} type="text" class="form-control" name="name" value = {this.state.name} placeholder="Name" />
                    <input onChange={this.inputChangeHandler} type="text" class="form-control" name="loc" value = {this.state.loc} placeholder="Location" />
                    <input onChange={this.inputChangeHandler} type="text" class="form-control" name="contact" value = {this.state.contact} placeholder="Contact" />
                    <input onChange={this.inputChangeHandler} type="text" class="form-control" name="desc" value = {this.state.desc} placeholder="Description" />
                    <button onClick={this.saveProfile} class="btn btn-primary">save</button> &nbsp; &nbsp;
                    <button onClick={this.cancel} class="btn btn-primary">Cancel</button> 
            </div>
            );
            
        }
        else if (this.state.redirect === false || this.state.rerender === true) {
           if (profileData.length>0) {
            renderRedirect =(

                    profileData.map((data, index) => {
                        return (
                            <div>
                                  <Card>
                                        <CardContent>
                            <div key={data.cmpy_id}>
                            <div class="row">
                                            <div class="col-md-10">
                            <Typography color="black" gutterBottom>
                                            <b><p style={{ fontSize: '24px' }}>{data.name}</p></b> </Typography>
                                            </div>
                                            <div class="col-md-2">
                                            <CreateOutlinedIcon onClick={this.editProfile} style={{ alignContent: 'right',height:"15px",width:"15px" }}></CreateOutlinedIcon>
                                            </div>
                                            </div>
                                <p>{data.cmpyDesc}</p>
                               
                               { data.contact?(<p><PhoneOutlinedIcon></PhoneOutlinedIcon> {data.contact}</p>):<p></p>}
                                <p><EmailOutlinedIcon></EmailOutlinedIcon> {data.email}</p>
                                <p><LocationOnOutlinedIcon></LocationOnOutlinedIcon>{data.loc}</p><br /><br />

                            </div>
                            {/* <div class="container">
                                <div class="login-form">
                                    <div class="main-div"> */}
                                        {/* <button onClick={this.editProfile} class="btn btn-primary">Edit Profile</button> */}
                                                                 

                                    {/* </div>
                                </div>
                            </div> */}
                            </CardContent></Card></div>
                   
                )
                    }))
                }

        }
       
        return (
            <div>
                {redirectVar}
                <div class="row">
                <div class="col-md-2"></div>
             <div class="col-md-8">
                {renderRedirect}
                </div>
                <div class="col-md-2"></div></div>
            </div>
        )
    }
}
//export Login Component
export default Profile;



////////////////////////
// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import cookie from 'react-cookies';
// import { Redirect } from 'react-router';
// import axios from 'axios';
// import '../../App.css';
// import { Card, CardContent, Button, IconButton, InputBase, TextField, Avatar,Input } from '@material-ui/core/';
// import Company_Logo from '../../images/Cover_Letter_Social.png'
// import {environment} from '../../Utils/constants'
// import emptyPic from '../../images/empty-profile-picture.png';
// ​
// class Profile extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             companyId: localStorage.getItem('companyId'),
//             profile:null,
//             editprofile:false,
//             companyname:"",
//             location:"",
//             email:"",
//             phone:"",
//             companydesc:"",
//             image:emptyPic
//         }
//         this.editProfile = this.editProfile.bind(this);
//         this.fetchCompanydetails = this.fetchCompanydetails.bind(this);
//     }
// ​
//     inputChangeHandler = (e) => {
//         const value = e.target.value
//         this.setState({
//             [e.target.name]: value
//         })
//     }
// ​
//     componentDidMount(){
//         this.fetchCompanydetails()
//     }
// ​
//     fetchCompanydetails(){
//         console.log(localStorage.getItem('companyId'))
//         axios.get(environment.baseUrl+'/company/profile/' + localStorage.getItem('companyId'))
//             .then((response) => {
//                     console.log(response.data)
//                     var base64Flag = 'data:image/jpeg;base64,';
                    
//                     if (response.data.result[0].image) {
//                         var imgstring = this.arrayBufferToBase64(response.data.result[0].image.data);
//                          response.data.result[0].image = base64Flag + imgstring
//                     }
// ​
//                 this.setState({
//                     profile : response.data.result[0],
//                     companyname:response.data.result[0].name,
//                     location:response.data.result[0].location,
//                     email:response.data.result[0].email,
//                     phone:response.data.result[0].phone,
//                     companydesc:response.data.result[0].company_description,
//                     image:response.data.result[0].image
//                 })
//                 console.log(this.state.profile)
//                 console.log(this.state.companydesc)
//             })
//     }
// ​
//     editProfile = () => {
//         this.setState(currentState =>({
//             editprofile: !currentState.editprofile
//         }))
// ​
//     }
// ​
//     arrayBufferToBase64(buffer) {
//         var binary = '';
//         var bytes = [].slice.call(new Uint8Array(buffer));
//         bytes.forEach((b) => binary += String.fromCharCode(b));
//         return window.btoa(binary);
//     };
// ​
//     showProfilepic = async (e) => {
//         console.log("profilepic")
//         this.setState({
//             image : e.target.files[0]
//         })
//         e.preventDefault();
// ​
//         const formData = new FormData();
//         formData.append('companyId', localStorage.getItem('companyId'))
//         formData.append('profilepic', e.target.files[0]);
      
//         const config = {
//             headers: {
//                 'content-type': 'multipart/form-data'
//             }
//         };
//         let rest = await axios.post(environment.baseUrl+"/company/uploadpic",formData, config)
//             .then((response) => {
//                 this.fetchCompanydetails();
//                 this.setState({
//                     openimage: false,
//                     file:null
//                 })
//             }).catch((error) => {
//             });
//     }
// ​
//     saveProfile = () =>{
//         console.log(this.state.companydesc)
//         let data={
//             'company_id':localStorage.getItem('companyId'),
//             'name':this.state.companyname,
//             'location':this.state.location,
//             'email':this.state.email,
//             'phone':this.state.phone,
//             'company_description':this.state.companydesc
//         }
//         console.log(data)
//         axios.put(environment.baseUrl+'/company/updateprofile', data)
//             .then((response)=>{
//                 console.log(response.data)
//                 if (response.data.result) {
//                     this.editProfile()
//                     this.fetchCompanydetails()
//                     console.log(response.data.result)
//                 } else {
//                     console.log(response.data.error)
//                 }
//             })
//     }
// ​
//     render(){
//         let companyEdit = null;
//         if (this.state.profile){
//             console.log(this.state.editprofile)
//         if(this.state.editprofile === true){
//             // redirectVar = <Redirect to= "/company/events"/>}
//             companyEdit = (
//                 <div>
//                 <Card style={{borderTopRightRadius:'0px',borderTopLeftRadius:'0px'}}>
//                             <CardContent><div style ={{paddingTop:'30px'}}>
//                                 {/* <img src = {Company_Logo} alt = 'Logo' height='70' width='70' ></img> */}
//                                 <div class="upload-btn-img">
//                                     <img src={this.state.image} height='70' width='70' class="img-thumbnail1 p-0 m-0" alt="Company"/>
//                                     <input type="file" name="image" onChange={this.showProfilepic} />
//                                 </div>
//                                 <div style = {{position:'relative', top:'-95px',left:'85px',marginTop:'20px'}}>
//                                     <div className="col-md-8">
//                                         <div class="form-group">
//                                         <div class="active-pink-4 mb-4" style={{ width: "50%",float:"left"}}>
//                                             <div style={{fontSize : "12px", marginTop:'15px',marginBottom:"7px"}}>Company Name</div>
//                                             <input class="form-control" type="text"  name="companyname" value = {this.state.companyname} style={{ width: "80%"}} placeholder="Company Name" aria-label="Company Name" onChange={this.inputChangeHandler}/>
//                                         </div> 
//                                         <div class="active-pink-4 mb-4" style={{ width: "50%",float:"right"}}>
//                                             <div style={{fontSize : "12px", marginTop:'15px',marginBottom:"7px"}}>Location</div>
//                                             <input class="form-control" type="text"  name="location" value = {this.state.location} style={{ width: "80%"}} placeholder="Location" aria-label="Location" onChange={this.inputChangeHandler}/>
//                                         </div> 
//                                         </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <Button variant="contained" size="small" color="primary" style = {{position:'relative',top:'-70px',left:'150px', backgroundColor : "#1569E0", width:'2px', marginRight:'10px' }} onClick={()=>{console.log("save");this.saveProfile()}}>Save</Button>
//                                         <Button variant="contained" size="small" color="primary" style = {{position:'relative',top:'-70px',left:'150px', backgroundColor : "#808080", width:'2px'}} onClick={()=>{this.editProfile()}}>Cancel</Button>
//                                     </div></div>
//                             </CardContent>
//                         </Card>
//                         <div style = {{marginTop : '20px', width:'103%',position:'relative',left:'-14px'}}>
//                         <div className="col-md-8">
//                         <Card>
//                             <CardContent>
//                                 <h4>{'About ' + this.state.companyname}</h4>
//                                 <textarea name="companydesc" rows="4" cols="80" style={{borderRadius:'5px'}}  onChange={this.inputChangeHandler}>
//                                     {this.state.companydesc}
//                                 </textarea>
//                             </CardContent>
//                         </Card>
//                         </div>
//                         <div className="col-md-4">
//                         <Card>
//                             <CardContent>
//                                 <h4>Contact Information</h4>
//                                 <div class="form-group">
//                                     <div class="active-pink-4 mb-4" style={{ width: "90%",marginBottom:"15px",marginTop:"20px"}}>
//                                         <div style={{fontSize : "12px", marginTop:'15px',marginBottom:"7px"}}>Email</div>
//                                         <input class="form-control" type="text"  name="email" value = {this.state.email} style={{ width: "80%" }} placeholder="Email" aria-label="Company Name" onChange={this.inputChangeHandler}/>
//                                     </div> 
//                                     <div class="active-pink-4 mb-4" style={{ width: "90%"}}>
//                                         <div style={{fontSize : "12px", marginTop:'15px',marginBottom:"7px"}}>Phone</div>
//                                         <input class="form-control" type="text"  name="phone" value = {this.state.phone} style={{ width: "80%" }} placeholder="Phone" aria-label="Location" onChange={this.inputChangeHandler}/>
//                                     </div> 
//                                 </div>
//                             </CardContent>
//                         </Card>
//                      </div>
//                      </div>
//                     </div>)
//         }
//         else{
//         companyEdit = (
//             <div>
//             <Card style={{borderTopRightRadius:'0px',borderTopLeftRadius:'0px'}}>
//                         <CardContent><div style ={{paddingTop:'30px'}}>
//                             {/* <img src = {Company_Logo} alt = 'Logo' height='70' width='70' ></img> */}
//                             <img src = {this.state.image} alt = 'Logo' height='70' width='70' ></img>
//                             <div style = {{position:'relative', top:'-70px',left:'85px'}}>
//                                 <div className="col-md-9">
//                                     <div><h4>{this.state.profile.name}</h4></div>
//                                     <div className="col-md-7" style={{marginLeft:"-10px",marginTop:"7px"}}><span class="glyphicon glyphicon-map-marker" style={{color: "Black" }}></span> {this.state.profile.location}</div>
//                                     <div className="col-md-3" style={{marginLeft:"-10px",marginTop:"7px"}}><span class="glyphicon glyphicon-envelope" style={{color: "Black" }}></span> {this.state.profile.email}</div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-3">
//                                     <Button variant="contained" size="small" color="primary" style = {{position:'relative',top:'-70px',left:'150px', backgroundColor : "#1569E0",width:'2px' }} onClick={()=>{this.editProfile()}}>Edit</Button>
//                                 </div></div>
//                         </CardContent>
//                     </Card>
//                     <div style = {{marginTop : '20px', width:'103%',position:'relative',left:'-14px'}}>
//                     <div className="col-md-8">
//                     <Card>
//                         <CardContent>
//                             <h4>{'About ' + this.state.profile.name}</h4>
//                             {this.state.profile.company_description}
//                         </CardContent>
//                     </Card>
//                     </div>
//                     <div className="col-md-4">
//                     <Card>
//                         <CardContent>
//                             <h4>Contact Information</h4>
//                             <div style={{fontSize : "12px", marginTop:'15px'}}>Email</div>
//                             <div style={{color: "#1569E0"}}><span class="glyphicon glyphicon-envelope" style={{color: "Black" }}></span>  {this.state.profile.email}</div>
//                             <div style={{fontSize : "12px", marginTop:'10px'}}>Phone</div>
//                             <div style={{color: "#1569E0"}}><span class="glyphicon glyphicon-earphone" style={{color: "Black" }}></span>  {this.state.profile.phone}</div>
//                         </CardContent>
//                     </Card>
//                  </div>
//                  </div>
//                 </div>)
//         }
//         }
//         return(
//             <div style={{width:'90%',paddingLeft:'120px'}}>
//                 <Card>
//                     <div style={{height:"200px"}}>
//                         <img src={Company_Logo}></img>
//                     </div>
//                 </Card>
//                 {companyEdit}
                
//             </div>
//         )
//     }
// }
// ​
// export default Profile;



///////////////////