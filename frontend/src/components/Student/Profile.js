
import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import Basic from './Basic';
import Education from './Education';
import Skill from './Skill';
import Experience from './Experience';
import Contact from './Contact';
import Journey from './Journey';
import Profilepic from './Profilepic';


import cookie from 'react-cookies';




//Define a Login Component
class Profile extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {

        }


    }


    componentDidMount() {

    }


    render() {
        let logincookie= null
        if(!cookie.load('student')){
            logincookie = <Redirect to= "/"/>
        }
        return (
            <div style={{backgroundColor:"#F7F7F7"}}>
                            {logincookie}

                <div class="row">
                <div class="col-md-1"> </div>
                    <div class="col-md-3"> <Profilepic/><Basic /> <Skill /></div>
                    <div class="col-md-7">
                        <Journey/>
                        <Education />
                        <Experience />
                        <Contact />
                       

                    </div>
                    <div class="col-md-1"> </div>
                </div>


            </div>
        )
    }
}
//export Login Component
export default Profile;