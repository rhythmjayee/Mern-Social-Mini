import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';


import React,{useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import {Provider} from "react-redux";
import store from "./store";
import {loadUser} from "./actions/authAction";

import {Container,Row,Col} from "react-bootstrap";


import './App.css';

import NavBar from "./components/NavBar/NavBar"
import Login from "./components/LoginRegister/Login/Login"
import SignUp from "./components/LoginRegister/Register/Register"
import Home from "./components/Home/Home";

function App() {

  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);

  let {isAuthenticated}=store.getState().auth

  return (
    <Provider store={store}>
       <Router>
         <NavBar/>
         <Container style={{marginTop:"100px"}}>
          <Row>
            <Col>
            <Switch>
          <Route path="/" exact>
         {isAuthenticated?<Home/>:<Redirect to="/login"/>} 

          </Route>

          {/* <Route path="/profile" exact>
         {isAuthenticate?<Home/>:<Redirect to="/login"/>} 
          </Route>
          <Route path="/people" exact>
         {isAuthenticate?<Home/>:<Redirect to="/login"/>} 
          </Route> */}
         

          
        <Route path="/login" exact>
          <Login/>
          </Route>
          <Route path="/signup" exact>
           <SignUp/>
          </Route>
          </Switch>
            </Col>
            {console.log(isAuthenticated)}

          </Row>
        </Container>
      
    </Router>
    </Provider>
  );
}

export default App;
