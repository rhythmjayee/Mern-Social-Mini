import axios from 'axios';
import { returnErrors } from './errorAction';
import {
  PEOPLE_LOADED,
  PEOPLE_LOADING,
  PEOPLE_FOLLOWED,
  PEOPLE_UNFOLLOWED,
  AUTH_ERROR
} from './types';

import {tokenConfig} from "./authAction";


export const loadPeople = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: PEOPLE_LOADING });
  
    axios
      .get(process.env.REACT_APP_BACKEND_URL+'/people', tokenConfig(getState))
      .then(res =>
        dispatch({
          type: PEOPLE_LOADED,
          payload: res.data
        })
      )
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: AUTH_ERROR
        });
      });
  };

  export const followPeople = (follow) => (dispatch, getState) => {
    // User loading
    // dispatch({ type: PEOPLE_LOADING });
  
    axios
      .post(process.env.REACT_APP_BACKEND_URL+'/people/follow',follow, tokenConfig(getState))
      .then(res =>{
        // dispatch(setPeopleLoading());
        dispatch({
          type: PEOPLE_FOLLOWED,
          payload: res.data
        }); 
      }
        
      )
      .then(res=>{
        dispatch(loadPeople());
      })
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: AUTH_ERROR
        });
      });
  };
  export const unFollowPeople = (follow) => (dispatch, getState) => {
    // User loading
    // dispatch({ type: PEOPLE_LOADING });
  
    axios
      .post(process.env.REACT_APP_BACKEND_URL+'/people/unfollow',follow, tokenConfig(getState))
      .then(res =>{
        // dispatch(setPeopleLoading());
        dispatch({
          type: PEOPLE_UNFOLLOWED,
          payload: res.data
        }); 
      }
        
      )
      .then(res=>{
        dispatch(loadPeople());
      })
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: AUTH_ERROR
        });
      });
  };

  

  export const setPeopleLoading = () => {
    return {
      type: PEOPLE_LOADING
    };
  };