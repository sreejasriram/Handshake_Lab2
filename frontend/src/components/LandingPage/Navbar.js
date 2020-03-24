import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import logo from '../../images/logo.png';



//create the Navbar Component
class NavbarPage extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);

    }
    handleLogout = () => {
        if (cookie.load('company')) {
            cookie.remove('company', { path: '/' })
        }
        else if (cookie.load('student')) {
            cookie.remove('student', { path: '/' })
        }
    }


    render() {
        let navLogin = null;
        let navHeader = null;
        let navUpdate = null;
        let redirectVar = null;
        if (cookie.load('company')) {
            console.log("Able to read company cookie");

/////////////////////////////////////
navLogin = (
    <div class="navbar-header">
        <div style = {{paddingLeft:'15px'}}>
        <a class="navbar-brand" href = "/Home"><img class="image" alt="Handshake" src={logo} width="30" height="30" /></a>
        </div>
    </div>)
navUpdate = (
    <div>
        <ul class="nav navbar-nav navbar-right">
            <li class = 'navli'><Link to="/Home">Jobs</Link></li>
            <li class='navli'><Link to="/events">Events</Link></li>
            <li class='navli'><Link to="/students">Students</Link></li>
            <li class='navli'><Link to="/profile">Profile</Link></li>
            <li class='navli'><Link to="/" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li> 
        </ul>
    </div>
);


            /////////////////////////////////
            // navLogin = (
            //     <ul class="nav navbar-nav navbar-right">
            //         <li><Link to="/Home">Jobs</Link></li>
            //         <li><Link to="/events">Events</Link></li>
            //         <li><Link to="/students">Students</Link></li>
            //         <li><Link to="/profile">Profile</Link></li>

            //         <li><Link to="/" onClick={this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
            //     </ul>


            // );
            /////////////////////////////////////////
        }
        else if (cookie.load('student')) {
            console.log("Able to read student cookie");

//////////////////////////////////

navLogin = (
    <div class="navbar-header">
        <a class="navbar-brand" href = "/studJobs"><img class="image" alt="Handshake" src={logo} width="30" height="30" /></a>
    </div>)
navUpdate = (
    // <navitem>
    //     <li><Link to="/student/jobs">Jobs</Link></li>
    // </navitem>,
    <navitem class="nav navbar-nav navbar-right">
            <li class='navli'><Link to="/studJobs">Jobs</Link></li>
            <li class='navli'><Link to="/companyevents">Events</Link></li>
            {/* <li class='navli'><Link to="/applications">Applications</Link></li> */}
            <li class='navli'><Link to="/HandshakeStudents">Students</Link></li>
            <li class='navli'><Link to="/studprofile">Profile</Link></li>
            <li class='navli'><Link to="/" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
    </navitem>
)
///////////////////////////////////


            // navLogin = (
            //     <ul class="nav navbar-nav navbar-right">
            //         <li><Link to="/studJobs">Jobs</Link></li>
            //         <li><Link to="/applications">Applications</Link></li>
            //         <li><Link to="/companyevents">Events</Link></li>
            //         <li><Link to="/HandshakeStudents">Students</Link></li>

            //         <li><Link to="/" onClick={this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
            //     </ul>
            // );

            ///////////////////////////////////////////
        }


        else {
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                // <ul class="nav navbar-nav navbar-right">
                //     <li><Link to="/studsignup">SignUp</Link></li>
                //     <li><Link to="/studlogin"><span class="glyphicon glyphicon-log-in"></span>Login</Link></li>
                // </ul>
               

//////
<div class="navbar-header">
<a class="navbar-brand" href = "/student"><img class="image" alt="Handshake" src={logo} width="30" height="30" /> </a>
</div>)
navUpdate = (
<div>
<ul class="nav navbar-nav">
    <li class='navli'><Link to="/studsignup">Signup</Link></li>
    <li class='navli'><Link to="/studlogin">Login</Link></li>
</ul>

</div>
)
redirectVar = <Redirect to="/"/>



///////
                // <Navbar bg="primary" variant="dark">
                //      <Navbar.Brand>
                //   <img
                //     alt=""
                //     src={logo}
                //     width="30"
                //     height="30"
                //     className="d-inline-block align-top"
                //   />{' '}
                //   Handshake
                // </Navbar.Brand>
                //     <Nav className="mr-auto" >
                //         <Nav.Link href="studsignup">SignUp</Nav.Link>
                //         <Nav.Link href="studlogin">Login</Nav.Link>
                //     </Nav></Navbar>
                // )
///////////
           
        }
        return (
            <div>
            {redirectVar}
            <nav class="navbar navbar-inverse" style={{borderRadius:'0px',backgroundColor:'#0F1035',height:'60px',color:'black',borderColor:'#0F1035'}}>
                <div class="container-fluid" style={{position:'relative',padding:'4px'}}>
                    {navLogin}
                    {navUpdate}
                </div>
            </nav>
            </div>
        )
    }
}
export default NavbarPage;