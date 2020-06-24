import React from "react";
import Radium from 'radium';


import logo from "./teamwork.svg"
import {Navbar,Nav} from "react-bootstrap"
import  {Link} from "react-router-dom";

import {connect} from "react-redux";

import Logout from "../LoginRegister/Logout/Logout"
// Link = Radium(Link);



const NavBar=(props)=>{

    const styles={
        link:{
            marginLeft:"20px",
            color:"#7bff56",

            textDecoration:"none",
            padding:"10px",
            boxShadow: '0 3px 3px #7bff56',
        },
        brand:{
            color:"#29ff00",
            textDecoration:"none",
            fontWeight:"bold",

        },
        header:{
            backgroundColor:"#0c0c0C"
        },
        toggle:{
          backgroundColor:'#29ff00',
        }
    }
    let {isAuthenticated}=props.auth;

    const authLink=(
        <React.Fragment>
        <Nav className="mr-auto">
      <Link style={styles.link}  to="/profile">Profile</Link>
      <Link  style={styles.link} to="/people">People</Link>
    </Nav>
        <Nav className="ml-auto">
              <Logout/>
    </Nav>
    </React.Fragment>
    );

    const guestLinks=(
        <React.Fragment>
    <Nav className="ml-auto">
    <Link  style={styles.link} to="/login">Login</Link>
    <Link   style={styles.link} to="/signup">SignUp</Link>
    </Nav>
    </React.Fragment>
    );
            
        

    return(
<Navbar style={styles.header} expand="lg" fixed="top">
    <Navbar.Brand  ><Link style={styles.brand} to="/">{<img src={logo} alt="Logo" style={{height:"50px"}} />} Mern-Social</Link></Navbar.Brand>
  <Navbar.Toggle  style={styles.toggle} aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    {isAuthenticated?authLink :guestLinks}
  </Navbar.Collapse>
</Navbar>
    )
}

const mapStateToProps=(state)=>({
auth:state.auth
})

export default connect(mapStateToProps,null)(Radium(NavBar));