import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';


import React,{useEffect} from 'react';


import {Provider} from "react-redux";
import store from "./store";
import {loadUser} from "./actions/authAction";


import './App.css';



import Root from "./components/Root/Root"

function App() {

  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);

  return (
    <Provider store={store}>
       <Root/>
    </Provider>
  );
}

export default App;
