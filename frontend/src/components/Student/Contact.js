
import React, { Component } from 'react';
import '../../App.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import { connect } from "react-redux";
import { editContact } from "../../redux/actions/index";



class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            mobile: "",
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
            if (this.props.email!==nextProps.profile.email)
            this.setState({ email:nextProps.profile.email});
            if (this.props.mobile!==nextProps.profile.mobile)
            this.setState({ mobile:nextProps.profile.mobile});
            if (nextProps.profile.email || nextProps.profile.mobile) {
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
            email: this.state.email,
            mobile: this.state.mobile
        }
        console.log(edit_data)
        this.props.editContact(edit_data)

        // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        // axios.post(environment.baseUrl+'/student/student_contact_edited', edit_data)
        //     .then(response => {
        //         console.log("in frontend after response");
        //         console.log(response.data.result)
        //         if (response.data.result) {
        //             this.setState({
                        
        //                 rerender: false,
        //                 email: response.data.result.email,
        //                 mobile: response.data.result.mobile

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
                        <Typography color="black" gutterBottom><b><p style={{ fontSize: '24px' }}>Contact</p></b></Typography>
                            <div style={{ width: '70%' }} class="form-group">
                            <input onChange={this.inputChangeHandler} type="text" class="form-control" name="mobile" value={this.state.mobile} placeholder="Mobile" />
                            <input onChange={this.inputChangeHandler} type="email" class="form-control" name="email" value={this.state.email} placeholder="Email" />
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
                                                <b><p style={{ fontSize: '24px' }}>Contact</p></b>

                                            </Typography>
                                            </div>
                                            <div class="col-md-2">
                                            <CreateOutlinedIcon onClick={this.editProfile} style={{ alignContent: 'right',height:"15px",width:"15px" }}></CreateOutlinedIcon>
                                            </div>
                                            </div>
                                            {/* {this.state.mobile?(<div><PhoneOutlinedIcon></PhoneOutlinedIcon> {this.state.mobile}</div>):<div></div>}
                                            {this.state.email?(<div><EmailOutlinedIcon></EmailOutlinedIcon> {this.state.email}</div>):<div></div>} */}
                                            {this.state.mobile?(<div><PhoneOutlinedIcon></PhoneOutlinedIcon> {this.state.mobile}</div>):<div></div>}
                                            {this.state.email?(<div><EmailOutlinedIcon></EmailOutlinedIcon> {this.state.email}</div>):<div></div>}
                                        
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
// export default Contact;
const mapStateToProps = state => {
    return {
    };
};

function mapDispatchToProps(dispatch) {
    return {
        editContact: payload => dispatch(editContact(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);





