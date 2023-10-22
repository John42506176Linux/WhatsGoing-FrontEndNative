import {API, graphqlOperation} from 'aws-amplify';
import {createEvent} from '../src/graphql/mutations';
import {listEvents} from '../src/graphql/queries';
import { SavedEvent } from '../reducers/savedEventReducer';
import {
  ADD_SAVED_EVENT_REQUEST,
  ADD_SAVED_EVENT_SUCCESS,
  ADD_SAVED_EVENT_FAILURE,
  LIST_SAVED_EVENTS_REQUEST,
  LIST_SAVED_EVENTS_SUCCESS,
  LIST_SAVED_EVENTS_FAILURE,
} from './actionTypes';


interface AddSavedEventRequestAction {
  type: typeof ADD_SAVED_EVENT_REQUEST;
}

interface AddSavedEventSuccessAction {
  type: typeof ADD_SAVED_EVENT_SUCCESS;
  payload: SavedEvent;
}

interface AddSavedEventFailureAction {
  type: typeof ADD_SAVED_EVENT_FAILURE;
  payload: string;
}

interface ListSavedEventsRequestAction {
  type: typeof LIST_SAVED_EVENTS_REQUEST;
}

interface ListSavedEventsSuccessAction {
  type: typeof LIST_SAVED_EVENTS_SUCCESS;
  payload: SavedEvent[];
}

interface ListSavedEventsFailureAction {
  type: typeof LIST_SAVED_EVENTS_FAILURE;
  payload: string;
}

export type SavedEventActionTypes =
  | AddSavedEventRequestAction
  | AddSavedEventSuccessAction
  | AddSavedEventFailureAction
  | ListSavedEventsRequestAction
  | ListSavedEventsSuccessAction
  | ListSavedEventsFailureAction;

export const addSavedEventRequest = (): AddSavedEventRequestAction => ({
  type: ADD_SAVED_EVENT_REQUEST,
});

export const addSavedEventSuccess = (savedEvent: SavedEvent): AddSavedEventSuccessAction => ({
  type: ADD_SAVED_EVENT_SUCCESS,
  payload: savedEvent,
});

export const addSavedEventFailure = (error: string): AddSavedEventFailureAction => ({
  type: ADD_SAVED_EVENT_FAILURE,
  payload: error,
});

export const listSavedEventsRequest = (): ListSavedEventsRequestAction => ({
  type: LIST_SAVED_EVENTS_REQUEST,
});

export const listSavedEventsSuccess = (savedEvents: SavedEvent[]): ListSavedEventsSuccessAction => ({
  type: LIST_SAVED_EVENTS_SUCCESS,
  payload: savedEvents,
});

export const listSavedEventsFailure = (error: string): ListSavedEventsFailureAction => ({
  type: LIST_SAVED_EVENTS_FAILURE,
  payload: error,
});

export const addSavedEvent = (savedEvent: SavedEvent) => {
  return async (dispatch: any) => {
    dispatch(addSavedEventRequest());
    try {
      const response = await API.graphql(graphqlOperation(createEvent, { input: savedEvent }));
      dispatch(addSavedEventSuccess(savedEvent));
    } catch (error: any) {
      dispatch(addSavedEventFailure(error.message));
    }
  };
};

export const listSavedEvents = () => {
  return async (dispatch: any) => {
    dispatch(listSavedEventsRequest());
    try {
      const response = await API.graphql(graphqlOperation(listEvents));
    //   const savedEvents = response.
      dispatch(listSavedEventsSuccess(response.data.listEvents.items));
    } catch (error:any) {
      dispatch(listSavedEventsFailure(error.message));
    }
  };
};