import { combineReducers } from 'redux';
import postReducer from "./postReducer";
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import peopleReducer from './peopleReducer';


export default combineReducers({
    post:postReducer,
    error: errorReducer,
  auth: authReducer,
  people:peopleReducer
});