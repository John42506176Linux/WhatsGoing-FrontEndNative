import { Auth, Hub,API} from 'aws-amplify';
import { Dispatch } from 'redux';
import * as ActionTypes from './actionTypes';
import { User } from '../models/user';
import * as mutations from '../src/graphql/mutations';
import { GraphQLQuery } from '@aws-amplify/api';
import * as queries from '../src/graphql/queries';
import { CreateUserInput, CreateUserMutation, ListUsersQuery } from '../src/API';


export const userSignInRequest = () => ({
  type: ActionTypes.USER_SIGN_IN_REQUEST,
});

export const userSignIn = () => ({
  type: ActionTypes.USER_SIGN_IN,
});

export const userSignInFailure = () => ({
  type: ActionTypes.USER_SIGN_IN_FAILURE,
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
    Hub.listen("auth", ({ payload: { event, data } }) =>  {
      switch (event) {
        case "signIn":
          dispatch(userSignInRequest());
          try {
            API.graphql<GraphQLQuery<ListUsersQuery>>({
              query: queries.listUsers,
            }).then((userData) => {
              const items = userData.data?.listUsers?.items;
              if (items?.length == 0) {
                    try {
                          // Datastore isn't working with custom primary key's so we have to use the API directly
                          const todoDetails: CreateUserInput = {
                            username: data.signInUserSession.idToken.payload.email,
                          };
                          API.graphql<GraphQLQuery<CreateUserMutation>>({ 
                            query: mutations.createUser, 
                            variables: { input: todoDetails }
                          }).then((newUserData) => {
                            dispatch(userSignUp());
                          }).catch((error) => {
                            console.error('Error saving user: ', error);
                          });                          
                    } catch (error) {
                      console.error('Error saving user: ', error);
                    }
              } else {
                dispatch(userSignIn());
              }
            });
            } catch (error:any) {
              console.error("Error Signing in ", error.message);
              dispatch(userSignInFailure());
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