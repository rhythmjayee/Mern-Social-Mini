import 'bootstrap/dist/css/bootstrap.min.css';


import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {Provider} from "react-redux";
import store from "./store";

import {Container,Row,Col} from "react-bootstrap";


import './App.css';

import NavBar from "./components/NavBar/NavBar"
import Login from "./components/LoginRegister/Login/Login"
import SignUp from "./components/LoginRegister/Register/Register"
import Home from "./components/Home/Home";

function App() {
  return (
    <Provider store={store}>
    <div >
       <Router>
         <NavBar/>
         <Container style={{marginTop:"100px"}}>
          <Row>
            <Col>
            <Switch>
        <Route path="/" exact>
          <Home/>
          </Route>
          
        <Route path="/login" exact>
          <Login/>
          </Route>
          <Route path="/signup" exact>
           <SignUp/>
          </Route>
          </Switch>
            </Col>
          </Row>
        </Container>
      
    </Router>
    </div>
    </Provider>
  );
}

export default App;
