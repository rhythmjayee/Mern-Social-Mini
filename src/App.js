import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import './App.css';

import Login from "./components/LoginRegister/Login/Login"
import SignUp from "./components/LoginRegister/Register/Register"

function App() {
  return (
    <div >
       <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/signup">signup</Link>
            </li>
          </ul>
        </nav>
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
      </div>
    </Router>
    </div>
  );
}

export default App;
