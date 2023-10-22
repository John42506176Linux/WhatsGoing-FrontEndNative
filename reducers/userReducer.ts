import {
    USER_SIGN_IN,
    USER_SIGN_OUT,
    SET_CUSTOM_STATE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
  } from '../actions/actionTypes';
  
  const initialState = {
    user: null,
    customState: null,
    loading: false,
    error: null,
  };
  
  const userReducer = (state = initialState, action: any ) => {
    switch (action.type) {
      case USER_SIGN_IN:
        return { ...state, user: action.payload };
      case USER_SIGN_OUT:
        return { ...state, user: null };
      case SET_CUSTOM_STATE:
        return { ...state, customState: action.payload };
      case GET_USER_REQUEST:
        return { ...state, loading: true };
      case GET_USER_SUCCESS:
        return { ...state, loading: false, user: action.payload };
      case GET_USER_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default userReducer;