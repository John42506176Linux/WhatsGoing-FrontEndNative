import { Auth, Hub } from 'aws-amplify';
import { Dispatch } from 'redux';
import {
  USER_SIGN_IN,
  USER_SIGN_OUT,
  SET_CUSTOM_STATE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from './actionTypes';
import { User } from '../models/user'

export const userSignIn = () => ({
  type: USER_SIGN_IN,
});

export const userSignOut = () => ({
  type: USER_SIGN_OUT,
});

export const setCustomState = (data: any) => ({
  type: SET_CUSTOM_STATE,
  payload: data,
});

export const getUserRequest = () => ({
  type: GET_USER_REQUEST,
});

export const getUserSuccess = (user: any) => ({
  type: GET_USER_SUCCESS,
  payload: user.toSerializable(),
});

export const getUserFailure = (error: string) => ({
  type: GET_USER_FAILURE,
  payload: error,
});

export const listenAuthEvents = () => {
  return (dispatch: Dispatch) => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          dispatch(userSignIn());
          break;
        case "signOut":
          dispatch(userSignOut());
          break;
        case "customOAuthState":
          dispatch(setCustomState(data));
      }
    });
  };
};

export const getUser = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getUserRequest());
    try {
      const user = await Auth.currentAuthenticatedUser();
      dispatch(getUserSuccess(User.fromJSON(user.attributes)));
    } catch (error: any) {
      dispatch(getUserFailure(error.message));
    }
  };
};