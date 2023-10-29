import {
    USER_SIGN_IN,
    SET_CUSTOM_STATE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    USER_SIGN_UP,
    USER_SIGN_OUT_SUCCESS,
    USER_SIGN_OUT_FAILURE,
  } from '../actions/actionTypes';
  
  const initialState = {
    signUp: false,
    signedIn: false,
    user: null,
    customState: null,
    loading: false,
    error: null,
  };
  
  const userReducer = (state = initialState, action: any ) => {
    switch (action.type) {
      case USER_SIGN_IN:
        return { ...state, signUp: false , signedIn: true};
      case USER_SIGN_UP:
        return { ...state, signUp: true, signedIn: true};
      case USER_SIGN_OUT_SUCCESS:
        return { ...state, user: null , signedIn: false, signUp: false };
      case USER_SIGN_OUT_FAILURE:
        return { ...state, error: action.payload, signedIn: false };
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