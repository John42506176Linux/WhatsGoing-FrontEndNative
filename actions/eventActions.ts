import * as ActionTypes from './actionTypes';
import { getCurrentDate } from '../utilities/utilities';
import { REACT_APP_BACKEND_URL } from "@env";
import {Event} from '../models/event';

interface FetchEventRequestAction {
  type: typeof ActionTypes.FETCH_EVENT_REQUEST;
}

interface FetchEventSuccessAction {
  type: typeof ActionTypes.FETCH_EVENT_SUCCESS;
  payload: any;  // Define a more specific type based on your data structure
}

interface FetchEventFailureAction {
  type: typeof ActionTypes.FETCH_EVENT_FAILURE;
  payload: string;
}

interface FetchEventTimeout {
  type: typeof ActionTypes.FETCH_EVENT_TIMEOUT,
}

interface FetchEventConnectionError {
  type: typeof ActionTypes.FETCH_EVENT_CONNECTION_ERROR,
}

interface FetchEventServerError {
  type: typeof ActionTypes.FETCH_EVENT_SERVER_ERROR,
  payload: string,
}

interface UpdateEventSavedAction {
  type: typeof ActionTypes.UPDATE_EVENT_SAVED,
  payload: { eventId: string, isSaved: boolean },
}

export type EventActionTypes = FetchEventRequestAction | FetchEventSuccessAction | FetchEventFailureAction | FetchEventTimeout | FetchEventConnectionError | FetchEventServerError | UpdateEventSavedAction;

export const fetchEventRequest = (): FetchEventRequestAction => ({
  type: ActionTypes.FETCH_EVENT_REQUEST,
});

export const fetchEventSuccess = (data: any): FetchEventSuccessAction => ({
  type: ActionTypes.FETCH_EVENT_SUCCESS,
  payload: data,
});

export const fetchEventFailure = (error: string): FetchEventFailureAction => ({
  type: ActionTypes.FETCH_EVENT_FAILURE,
  payload: error,
});

export const updateEventSavedSuccess = (eventId: string, isSaved: boolean): UpdateEventSavedAction => ({
  type: ActionTypes.UPDATE_EVENT_SAVED,
  payload: { eventId, isSaved },
});

export const fetchEventTimeout = (): FetchEventTimeout => ({
  type: ActionTypes.FETCH_EVENT_TIMEOUT
});

export const fetchEventConnectionError = (): FetchEventConnectionError => ({
  type: ActionTypes.FETCH_EVENT_CONNECTION_ERROR
});

export const fetchEventServerError = (error: any): FetchEventServerError => ({
  type: ActionTypes.FETCH_EVENT_SERVER_ERROR,
  payload: error,
});

export const updateEventSaved = (eventId: string, isSaved: boolean) => {
  return async (dispatch: any) => {
    dispatch(updateEventSavedSuccess(eventId, isSaved));
  };
}

export const fetchEvent =  (userLocation: string, event_preferences: string[]) => {
  return async (dispatch: any) => {
    dispatch(fetchEventRequest());
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 100000);
      const response = await fetch(REACT_APP_BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          location: userLocation || 'San Francisco, CA',
          event_preferences: event_preferences,
          date: getCurrentDate(),
        }),
      });
      clearTimeout(timeoutId);
      const data = await response.json();
      if (response.status !== 200) throw new Error(`Server Error:${data['detail']}`);
      let jsonArray = JSON.parse(data['response']);
      jsonArray = jsonArray.map((event: any) => {
        return new Event(event).toJSON();
      });
      dispatch(fetchEventSuccess(jsonArray));
    } catch (error: any) {
      if (error.name === 'TypeError') {
        dispatch(fetchEventConnectionError());
      } else if (error.name === 'AbortError') {
        dispatch(fetchEventTimeout());
      } else if (error.toString().includes('Server Error')) {
        dispatch(fetchEventServerError(error.toString().replace('Error: Server Error:', '')));
      } else dispatch(fetchEventFailure(error.toString())); // TODO: Replace with proper logging
    }
  };
};
  