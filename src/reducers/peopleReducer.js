import {
    PEOPLE_LOADED,
    PEOPLE_LOADING,
    PEOPLE_FOLLOWED,
    PEOPLE_UNFOLLOWED,
  } from '../actions/types';

  const initialState = {
    users:[],
    isLoading: false
  };


  export default function(state = initialState, action) {
    switch (action.type) {
      case PEOPLE_LOADING:
        return {
          ...state,
          isLoading: true
        };
      case PEOPLE_LOADED:
        return {
          ...state,
          isLoading: false,
          users: action.payload
        };
        case PEOPLE_FOLLOWED:
        case PEOPLE_UNFOLLOWED:
          return {
            ...state
          };
      default:
        return state;
    }
  }