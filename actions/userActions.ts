import { Auth, Hub,API } from 'aws-amplify';
import { Dispatch } from 'redux';
import * as ActionTypes from './actionTypes';
import { User } from '../models/user';
import * as mutations from '../src/graphql/mutations';
import { GraphQLQuery } from '@aws-amplify/api';
import * as queries from '../src/graphql/queries';
import { CreateUserInput, CreateUserMutation, ListUsersQuery } from '../src/API';

export const userSignIn = () => ({
  type: ActionTypes.USER_SIGN_IN,
});

export const userSignUp = () => ({
  type: ActionTypes.USER_SIGN_UP,
});

export const userSignOutSuccess = () => ({
  type: ActionTypes.USER_SIGN_OUT_SUCCESS,
});

export const userSignOutFailure = (error: string) => ({
  type: ActionTypes.USER_SIGN_OUT_FAILURE,
  payload: error,
});

export const setCustomState = (data: any) => ({
  type: ActionTypes.SET_CUSTOM_STATE,
  payload: data,
});

export const getUserRequest = () => ({
  type: ActionTypes.GET_USER_REQUEST,
});

export const getUserSuccess = (user: any) => ({
  type: ActionTypes.GET_USER_SUCCESS,
  payload: user.toSerializable(),
});

export const getUserFailure = (error: string) => ({
  type: ActionTypes.GET_USER_FAILURE,
  payload: error,
});

export const listenAuthEvents = () => {
  return async (dispatch: Dispatch) => {
    console.log("Listening to auth events");
    Hub.listen("auth", ({ payload: { event, data } }) =>  {
      switch (event) {
        case "signIn":
          console.log("Sign in Event: ", event);
          try {
            API.graphql<GraphQLQuery<ListUsersQuery>>({
              query: queries.listUsers,
            }).then((userData) => {
              const items = userData.data?.listUsers?.items;
              console.log("Items: ", items);
              if (items?.length == 0) {
                    try {
                          // Datastore isn't working with custom primary key's so we have to use the API directly
                          const todoDetails: CreateUserInput = {
                            username: data.signInUserSession.idToken.payload.email,
                          };
                          console.log("Creating new user");
                          API.graphql<GraphQLQuery<CreateUserMutation>>({ 
                            query: mutations.createUser, 
                            variables: { input: todoDetails }
                          }).then((newUserData) => {
                            console.log("New User Data: ", newUserData);
                            dispatch(userSignUp());
                          });                          
                    } catch (error) {
                      console.error('Error saving user: ', error);
                    }
              } else {
                console.log("Signing in user");
                dispatch(userSignIn());
              }
            });
            } catch (error:any) {
              console.log("Error Signing in ", error.message);
            }
          break;
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


export const signOut = () => {
  return async (dispatch: Dispatch) => {
    try {
      await Auth.signOut();
      dispatch(userSignOutSuccess());
    } catch (error: any) {
      dispatch(userSignOutFailure(error.message));
    }
  };
};