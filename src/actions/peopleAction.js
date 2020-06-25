import axios from 'axios';
import { returnErrors } from './errorAction';
import {
  PEOPLE_LOADED,
  PEOPLE_LOADING,
  AUTH_ERROR
} from './types';

import {tokenConfig} from "./authAction";


export const loadPeople = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: PEOPLE_LOADING });
  
    axios
      .get('http://localhost:5000/api/people', tokenConfig(getState))
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