import 'bootstrap/dist/css/bootstrap.min.css';


import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import './App.css';

import NavBar from "./components/NavBar/NavBar"
import Login from "./components/LoginRegister/Login/Login"
import SignUp from "./components/LoginRegister/Register/Register"

function App() {
  return (
    <div >
       <Router>
         <NavBar/>
        <Switch>
        <Route path="/" exact>
          </Route>
        <Route path="/login" exact>
          {/* <Login/> */}
          </Route>
          <Route path="/signup" exact>
           {/* <SignUp/> */}
          </Route>
          </Switch>
      {/* </div> */}
    </Router>
    </div>
  );
}

export default App;
