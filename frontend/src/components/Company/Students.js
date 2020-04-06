import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {environment} from '../../Utils/constants';
import TablePagination from '@material-ui/core/TablePagination';



class Students extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataRetrieved: false,
            stuData: [],
            status: "",
            namesearch: "",
            clgsearch: "",
            skillsearch: "",
            view_profile: false,
            studId: "",
            page: 0,
            rowsPerPage: 2

        }
        this.statusFilter = this.statusFilter.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.viewProfile = this.viewProfile.bind(this);

    }

    inputChangeHandler = (e) => {
        const value = e.target.value
        this.setState({
            [e.target.name]: value
        })
        console.log(this.state.namesearch)
    }

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        })
        console.log(this.state.page)
    };


    statusFilter(e) {
        console.log(e)
        this.setState({
            status: e.target.value
        })
    }
    viewProfile = (e) => {
        var headers = new Headers();
        console.log(e.target.value);
        this.setState({
            view_profile: true,
            studId: e.target.value
        })
    }
    componentDidMount() {

        axios.get(environment.baseUrl+'/company/list_all_students')
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                if (response.data.rows) {
                    this.setState({
                        dataRetrieved: true,
                        stuData: response.data.rows
                    });
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                }
            })
    }


    render() {

        let stuData = this.state.stuData;
        console.log(stuData)
        let namesearch = this.state.namesearch;
        let clgsearch = this.state.clgsearch;
        let skillsearch = this.state.skillsearch;
        let renderRedirect = null
        if (this.state.view_profile === true) {
            renderRedirect = <Redirect to={`/ViewProfile/${this.state.studId}`} />
        }
        if (this.state.stuData) {

            if (namesearch.length > 0) {
                stuData = stuData.filter((job) => {
                    // return (job.title.indexOf(namesearch) > -1 || job.name.indexOf(namesearch) > -1)
                    return (job.name.indexOf(namesearch) > -1)

                })
            }
            if (clgsearch.length > 0) {
                stuData = stuData.filter((job) => {
                    console.log(job)
                    if (job.college != null)
                        return job.college.indexOf(clgsearch) > -1
                })
            }
            if (skillsearch.length > 0) {
                stuData = stuData.filter((job) => {
                    if (job.skills != null)
                        return job.skills.indexOf(skillsearch) > -1
                })
            }
            console.log(stuData)

        }



        return (
            <div>
                {renderRedirect}
                <div class="row">
                <div class="col-md-3">
                <Card>
                    <CardContent>
                        <div>
                        < Typography color="black" gutterBottom>
                   <b><p style={{ fontSize: '24px' }}>Filter</p></b></ Typography>
                            <div><input type="text" name="namesearch" id="namesearch"  placeholder="student name" onChange={this.inputChangeHandler} /></div><br/>
                            <div><input type="text" name="clgsearch" id="clgsearch"  placeholder="student college" onChange={this.inputChangeHandler} /></div><br/>
                            <div><input type="text" name="skillsearch" id="skillsearch"  placeholder="student skill" onChange={this.inputChangeHandler} /></div>
                        </div>
                    </CardContent>
                </Card>
                </div>
                <div class="col-md-7">
                {stuData.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((data, index) => {

                {/* {stuData.map((data, index) => { */}
                    return (
                        <div key={data._id}>
                            <Card>
                                <CardContent>

                                    <h3>{data.name}</h3>
                                    <p> {data.college}</p>
                                    <p> {data.email} </p>
                                    <p> {data.mobile} </p>
                                    <button onClick={this.viewProfile} class="btn btn-primary" value={data._id}>View Profile</button>
                                </CardContent>
                            </Card>
                            <br /><br />
                        </div>
                    )
                })}
                
                <div class="row">
                    <div class="col-md-4"></div>
                    <div class="col-md-4">
                        <TablePagination
                            rowsPerPageOptions={[2]}
                            count={this.state.stuData.length}
                            page={this.state.page}
                            rowsPerPage={this.state.rowsPerPage}
                            onChangePage={this.handleChangePage}
                        />
                    </div>  <div class="col-md-4"></div>
                </div>
                </div>
                <div class="col-md-2"></div>
                </div>
            </div>

        )
    }
}
export default Students;