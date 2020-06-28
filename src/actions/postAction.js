import axios from 'axios';
import {
    GET_POSTS,
    ADD_POST,
    DELETE_POST,
    POSTS_LOADING,
    POST_LIKED,
    POST_UNLIKED,
    GET_PEOPLE_POSTS,
    POST_COMMENTED
  } from './types';

  
  
import { tokenConfig,loadUser } from './authAction';
import { returnErrors } from './errorAction';

export const getPosts = (id) => (dispatch) => {
  dispatch(setPostsLoading());
  axios
    .get(`http://localhost:5000/api/user/post/${id}`)
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getPeoplePosts = () => (dispatch,getState) => {
  dispatch(setPostsLoading());
  axios
    .get(`http://localhost:5000/api/people/posts`,tokenConfig(getState))
    .then(res=>
      dispatch({
        type: GET_PEOPLE_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// export const getComments = (id) => (dispatch) => {
//   dispatch(setPostsLoading());
//   axios
//     .get(`http://localhost:5000/api/people/comments/${id}`)
//     .then(res =>
//       dispatch({
//         type: GET_POSTS,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };

export const addPost = (post) => (
  dispatch,
  getState
) => {
  // dispatch(setPostsLoading());
  axios
    .post('http://localhost:5000/api/user/post/add', post, 
    tokenConfig(getState)
    )
    .then(res =>{
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
      // console.log(res.data)
    }
      
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deletePost = (id) => (
  dispatch,
  getState
) => {
  dispatch(setPostsLoading());
  axios
    .delete(`http://localhost:5000/api/user/post/${id}`,
     tokenConfig(getState)
     )
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    ).then(res=>{
      dispatch(loadUser());
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
}; 

export const likePost= (like) => (dispatch, getState) => {
  // User loading
  // dispatch({ type: PEOPLE_LOADING });
  axios
    .post('http://localhost:5000/api/people/like',like, tokenConfig(getState))
    .then(res =>{
      dispatch({
        type: POST_LIKED,
        payload: res.data
      }); 
    }
      
    ).then(res=>{
      dispatch(getPeoplePosts());
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const unlikePost= (unlike) => (dispatch, getState) => {
  // User loading
  // dispatch({ type: PEOPLE_LOADING });
  axios
    .post('http://localhost:5000/api/people/unlike',unlike, tokenConfig(getState))
    .then(res =>{
      dispatch({
        type: POST_UNLIKED,
        payload: res.data
      }); 
    }
      
    ).then(res=>{
      dispatch(getPeoplePosts());
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const commentPost= (comment) => (dispatch, getState) => {
  // User loading
  // dispatch({ type: PEOPLE_LOADING });
  axios
    .post('http://localhost:5000/api/people/comment',comment, tokenConfig(getState))
    .then(res =>{
      dispatch({
        type: POST_COMMENTED,
        payload: res.data
      }); 
    }
      
    ).then(res=>{
      dispatch(getPeoplePosts());
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const setPostsLoading = () => {
  return {
    type: POSTS_LOADING
  };
};