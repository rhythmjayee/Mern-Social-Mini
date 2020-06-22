import React from "react";
import Radium from 'radium';


import logo from "./teamwork.svg"
import {Navbar,Nav} from "react-bootstrap"
var  Link =require("react-router-dom").Link;
Link = Radium(Link);



const NavBar=()=>{

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
    return(
<Navbar style={styles.header} expand="lg" fixed="top">
    <Navbar.Brand  ><Link style={styles.brand} to="/">{<img src={logo} alt="Logo" style={{height:"50px"}} />} Mern-Social</Link></Navbar.Brand>
  <Navbar.Toggle  style={styles.toggle} aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  <Nav className="mr-auto">
      <Link style={styles.link}  to="/home">Home</Link>
      <Link  style={styles.link} to="/people">People</Link>
    </Nav>
    <Nav>
    <Link  style={styles.link} to="/login">Login</Link>
    <Link  style={styles.link} to="/logout">Logout</Link>
    <Link   style={styles.link} to="/signup">SignUp</Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    )
}

export default Radium(NavBar);