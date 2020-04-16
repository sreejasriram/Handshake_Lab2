
import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import {environment} from '../../Utils/constants';
import emptyPic from '../../images/empty-profile-picture.png';
import { Avatar } from '@material-ui/core';
import { connect } from "react-redux";
import { viewEventApplicants } from "../../redux/actions/index";



class ViewEventApplicants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            mobile: "",
            event_id:this.props.match.params.eventId,
            dataRetrieved: false,
            redirect: false,
            stuData: [],
            view_profile:false,
            studId:"",
            emptyprofilepic: emptyPic
        }
        this.viewProfile = this.viewProfile.bind(this);
    }
  

    viewProfile = (e) => {
        var headers = new Headers();
        console.log(e.target.value);
        this.setState({
            view_profile: true,
            studId:e.target.value

        })
    }


    componentDidMount() {
        let cmpny_id = sessionStorage.getItem('id');
        const data = {
            id: cmpny_id,
            event_id:this.state.event_id
        }
        this.props.viewEventApplicants(data);

        // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        // axios.get(environment.baseUrl+'/company/list_event_applicants/'+data.event_id)
        //     .then(response => {
        //         console.log("in frontend after response");
        //         console.log(response.data.rows)
        //         if (response.data.rows.length>0) {
        //             this.setState({
        //                 dataRetrieved: true,
        //                 stuData: response.data.rows,
        //                 name: response.data.rows[0].name,
        //                 email: response.data.rows[0].email,
        //                 mobile: response.data.rows[0].mobile
        //             });
                  
        //         } else if (response.data.error) {
        //             console.log("response" + response.data.error)
        //         }
        //     })
    }


    render() {
        let renderRedirect = null;
       
        if (this.state.view_profile === true) {
            renderRedirect = <Redirect to={`/ViewProfile/${this.state.studId}`}/>
        }
        
        let stuData = this.props.stuData;
        console.log(stuData)
        return (
            <div>
                <div class="container">
                   
                                <h4>Students Applied </h4><br/>
                            </div>
                            <div>
                                {renderRedirect}
                            </div>
                            <div class="row">
                <div class="col-md-2"></div>
                    <div class="col-md-7">
                                <div>
                                    {stuData.length?stuData.map((data, index) => {
                                        return (
                                            <div key={data.stud_id}>
                                                  <Card>
                                                    <CardContent>
                                                    {/* < Typography color="black" gutterBottom>
                                                    <b><p style={{ fontSize: '24px' }}>{data.name}</p></b></ Typography> */}
                                                    <div class="row">
                                                        <div class="col-md-1" style={{ paddingRight: '0px' }}>
                                                            <center>
                                                                <Avatar src={data.image ? data.image : this.state.emptyprofilepic} style={{ width: '36px', height: '36px', borderRadius: '50%', textAlign: 'center' }}></Avatar>
                                                            </center>
                                                        </div>
                                                        <div class="col-md-5" style={{ padding: '0px' }}>
                                                        < Typography color="black" gutterBottom>

                                                            <b><div style={{ fontSize: '24px' }}>{data.name?data.name:""}</div></b>
                                                        </ Typography>                                               
                                                            </div>
                                                    </div><br/>
                                                    {data.email?(<div><MailOutlineOutlinedIcon style={{ color: "#1569E0" }}></MailOutlineOutlinedIcon> {data.email}</div>):<div></div>}<br/>
                                                    {data.mobile?(<div><PhoneOutlinedIcon style={{ color: "#1569E0" }}></PhoneOutlinedIcon> {data.mobile}</div>):<div></div>}
                                                     <br />
                                               
                                                <button onClick={this.viewProfile} class="btn btn-primary"  value={data._id}>View Profile</button>  
                                                </CardContent></Card>
                                            </div>
                                        )
                    }):""}

                </div> </div> <div class="col-md-2"></div></div>


            </div>
        )
    }
}
// export default ViewEventApplicants;
const mapStateToProps = state => {
    console.log(state.eventapplicants)
    
    return {

        stuData:state.eventapplicants

    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
        viewEventApplicants: payload => dispatch(viewEventApplicants(payload))
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ViewEventApplicants);