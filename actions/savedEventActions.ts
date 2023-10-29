import { DataStore } from 'aws-amplify';
import { SavedEvent,Event } from '../models/event';
import { Event as EventAPI } from '../src/models/';
import { getCurrentDate } from '../utilities/utilities';
import {
  ADD_SAVED_EVENT_REQUEST,
  ADD_SAVED_EVENT_SUCCESS,
  ADD_SAVED_EVENT_FAILURE,
  LIST_SAVED_EVENTS_REQUEST,
  LIST_SAVED_EVENTS_SUCCESS,
  LIST_SAVED_EVENTS_FAILURE,
} from './actionTypes';

// TODO: Console.error is temporary, Replace with logging

interface AddSavedEventRequestAction {
  type: typeof ADD_SAVED_EVENT_REQUEST;
}

interface AddSavedEventSuccessAction {
  type: typeof ADD_SAVED_EVENT_SUCCESS;
  payload: SavedEvent;
  timestamp: number;
}

interface AddSavedEventFailureAction {
  type: typeof ADD_SAVED_EVENT_FAILURE;
  payload: string;
  timestamp: number;
}

interface ListSavedEventsRequestAction {
  type: typeof LIST_SAVED_EVENTS_REQUEST;
}

interface ListSavedEventsSuccessAction {
  type: typeof LIST_SAVED_EVENTS_SUCCESS;
  payload: SavedEvent[];
  timestamp: number;
}

interface ListSavedEventsFailureAction {
  type: typeof LIST_SAVED_EVENTS_FAILURE;
  payload: string;
  timestamp: number;
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

export const addSavedEventSuccess = (savedEvent: any, timestamp: number): AddSavedEventSuccessAction => ({
  type: ADD_SAVED_EVENT_SUCCESS,
  payload: savedEvent,
  timestamp: timestamp,
});

export const addSavedEventFailure = (error: string,timestamp: number): AddSavedEventFailureAction => ({
  type: ADD_SAVED_EVENT_FAILURE,
  payload: error,
  timestamp: timestamp,
});

export const listSavedEventsRequest = (): ListSavedEventsRequestAction => ({
  type: LIST_SAVED_EVENTS_REQUEST,
});

export const listSavedEventsSuccess = (savedEvents: any, timestamp: number): ListSavedEventsSuccessAction => ({
  type: LIST_SAVED_EVENTS_SUCCESS,
  payload: savedEvents,
  timestamp: timestamp,
});

export const listSavedEventsFailure = (error: string, timestamp: number): ListSavedEventsFailureAction => ({
  type: LIST_SAVED_EVENTS_FAILURE,
  payload: error,
  timestamp: timestamp,
});

export const addSavedEvent = (event: Event) => {
  return async (dispatch: any) => {
    dispatch(addSavedEventRequest());
    try {
      const savedEvent = event.convertEventToSavedEvent(getCurrentDate());
      const eventAPI = savedEvent.toAPIEvent();
      await DataStore.save(eventAPI);
      dispatch(addSavedEventSuccess(savedEvent.toJSON(),Date.now()));
    } catch (error: any) {
      console.error("Error: ", error);
      dispatch(addSavedEventFailure(error.message,Date.now()));
    }
  };
};


export const listSavedEvents = () => {
  return async (dispatch: any) => {
    dispatch(listSavedEventsRequest());
    try {
      const response = await DataStore.observeQuery(EventAPI);
      const savedEvents = response.map((event) => {
        return SavedEvent.fromJSON(event).toJSON();
      });
      dispatch(listSavedEventsSuccess(savedEvents,Date.now()));
    } catch (error:any) {
      dispatch(listSavedEventsFailure(error.message,Date.now()));
    }
  };
};