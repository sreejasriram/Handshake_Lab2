import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {environment} from '../../Utils/constants';



  
//Define a Login Component
class JobApply extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            cmpy_id: this.props.cmpy_id,
            resume: "",
            job_id: this.props.job_id,
            // id: this.props.location.state.id,
            dataRetrieved: false,
            redirect: false,
            profileData: [],
            submitted: false,
            resume:"",
            open: false,
            setOpen: true
            // name, location, description, contact information,
        }
        this.submitJob = this.submitJob.bind(this);
        this.onApply = this.onApply.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);   
        // this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
            setOpen: true
        })
        console.log("in handle open");
        console.log(this.state.open)
    };

    handleClose = () => {
        this.setState({
            open: false,
            setOpen: false
        })
        console.log("in handle close")
        console.log(this.state.open)

    };
  
    handleFileChange = (e) => {
        // console.log(e.target.files[0]);
        this.setState({
            resume: e.target.files[0]
        })
    }
    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     if (this.props.open!==nextProps.open)
    //     this.setState({ open:nextProps.open});
    //     console.log("aaa")
    //     console.log(this.state.open)
    // }
    submitJob = async (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        let fdata = new FormData();
        fdata.append('cmpy_id', this.state.cmpy_id);
        fdata.append('job_id', this.state.job_id);
        fdata.append('stud_id',sessionStorage.getItem('id'));
        fdata.append('app_date',new Date().toISOString().slice(0, 19).replace('T', ' '));
        
        // fdata.append('status',"Pending");
        fdata.append('file', this.state.resume);
       
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
    console.log(this.state.resume)
    await console.log(fdata)
        var rest = await axios.post(environment.baseUrl+'/company/apply_job', fdata , config)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.result)
                if (response.data.result) {
                    this.setState({
                        submitted: true,
                        open: false,
                        setOpen: false

                    });
                    // console.log(response.data.rows[0].title)
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                }
            })
    }
    onApply()
    {
        this.setState({
            open : true,
        });
    }

    render() {
        let display = null
        let logincookie= null
        if(!cookie.load('student')){
            logincookie = <Redirect to= "/"/>
        }
        if (this.state.submitted == true) {
            display = <Redirect to='/studJobs'/>

        }
        return (
            <div>
                <div>
                {logincookie}
                <button onClick={this.onApply} class="btn btn-primary">Apply</button>
                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogContent>
                    <input type="file" placeholder="Attach Your Resume." onChange={this.handleFileChange} />
                    </DialogContent>
                    <DialogActions>
                    <button onClick={this.submitJob} class="btn btn-primary">submit Application</button>
                    <button onClick={this.handleClose} color="primary">
                            Cancel
            </button>
                    </DialogActions>
                </Dialog>

                </div>
                <div> {display}</div>
            </div>

        )
    }
}
//export Login Component
export default JobApply;