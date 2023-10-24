import { ADD_SAVED_EVENT_REQUEST, ADD_SAVED_EVENT_SUCCESS, ADD_SAVED_EVENT_FAILURE, LIST_SAVED_EVENTS_REQUEST, LIST_SAVED_EVENTS_SUCCESS, LIST_SAVED_EVENTS_FAILURE } from '../actions/actionTypes';
import { SavedEvent } from '../models/event';

export interface SavedEventState {
  loading: boolean;
  savedEvents: SavedEvent[];
  error: string | null;
  actionTimestamp: number | null;
}

const initialState: SavedEventState = {
  loading: false,
  savedEvents: [],
  actionTimestamp: null,
  error: null,
};

const savedEventReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_SAVED_EVENT_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_SAVED_EVENT_SUCCESS:
      return { ...state, loading: false, savedEvents: [...state.savedEvents, action.payload], actionTimestamp: action.timestamp };
    case ADD_SAVED_EVENT_FAILURE:
      return { ...state, loading: false, error: action.payload, actionTimestamp: action.timestamp };
    case LIST_SAVED_EVENTS_REQUEST:
      return { ...state, loading: true, error: null };
    case LIST_SAVED_EVENTS_SUCCESS:
      return { ...state, loading: false, savedEvents: action.payload, actionTimestamp: action.timestamp };
    case LIST_SAVED_EVENTS_FAILURE:
      return { ...state, loading: false, error: action.payload, actionTimestamp: action.timestamp };
    default:
      return state;
  }
};

export default savedEventReducer;