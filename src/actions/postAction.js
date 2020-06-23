import axios from 'axios';
import {
    GET_POSTS,
    ADD_POST,
    DELETE_POST,
    POSTS_LOADING
  } from './types';
  
// import { tokenConfig } from './authActions';
// import { returnErrors } from './errorActions';

export const getPosts = (id) => (dispatch) => {
  dispatch(setPostsLoading());
  axios
    .get(`/user/post/${id}`)
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    // .catch(err =>
    //   dispatch(returnErrors(err.response.data, err.response.status))
    // );
};

export const addPost = (post) => (
  dispatch,
  getState
) => {
  axios
    .post('/user/post/add', post, 
    // tokenConfig(getState)
    )
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    // .catch(err =>
    //   dispatch(returnErrors(err.response.data, err.response.status))
    // );
};

export const deletePost = (id) => (
  dispatch,
  getState
) => {
  axios
    .delete(`/user/post/${id}`,
    //  tokenConfig(getState)
     )
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    // .catch(err =>
    //   dispatch(returnErrors(err.response.data, err.response.status))
    // );
};

export const setPostsLoading = () => {
  return {
    type: POSTS_LOADING
  };
};