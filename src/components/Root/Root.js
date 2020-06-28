import React,{Suspense} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


import {Container,Row,Col} from "react-bootstrap";

import {connect} from "react-redux";

import Loader from 'react-loader-spinner'



// import NavBar from "../NavBar/NavBar"
// import Login from "../LoginRegister/Login/Login"
// import SignUp from "../LoginRegister/Register/Register"
// import Home from "../Home/Home";
// import Profile from "../Profile/Profile"
// import AllUsers from "../AllUsers/AllUsers"


const NavBar =React.lazy(()=>import("../NavBar/NavBar"));
const Login =React.lazy(()=>import(".../LoginRegister/Login/Login"));
const SignUp =React.lazy(()=>import("../LoginRegister/Register/Register"));
const Home =React.lazy(()=>import("../Home/Home"));
const Profile =React.lazy(()=>import("../Profile/Profile"));
const AllUsers =React.lazy(()=>import("../AllUsers/AllUsers"));


function Root(props) {



  return (
       <Router>
         <NavBar/>
         <Container style={{marginTop:"100px"}}>
          <Row>
            <Col>
            <Suspense fallback={
              <Col sm={12}>
              <Loader
              type="Circles"
              color="#29ff00"
              height={100}
              width={100}
              timeout={5000} //3 secs
              style={{textAlign:"center"}} 
          />
          </Col>
            }>

            <Switch>
          <Route path="/" exact>
          {/* <Redirect  to="/profile"/> */}
         {props.auth?<Home/>:<Redirect from="/" to="/login"/>} 
          </Route>

          <Route path="/profile" exact>
         {props.auth?<Profile/>:<Redirect to="/login"/>} 
          </Route>
          <Route path="/people" exact>
         {props.auth?<AllUsers/>:<Redirect to="/login"/>} 
          </Route>
         

          
        <Route path="/login" exact>
          <Login/>
          </Route>
          <Route path="/signup" exact>
           <SignUp/>
          </Route>
          </Switch>
          </Suspense>
            </Col>
          </Row>
        </Container>
      
    </Router>
  );
}

const mapStateToProps=(state)=>({
    auth:state.auth.isAuthenticated
})

export default connect(mapStateToProps,null)(Root);
