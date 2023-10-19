import { ADD_SAVED_EVENT_REQUEST, ADD_SAVED_EVENT_SUCCESS, ADD_SAVED_EVENT_FAILURE, LIST_SAVED_EVENTS_REQUEST, LIST_SAVED_EVENTS_SUCCESS, LIST_SAVED_EVENTS_FAILURE } from '../actions/actionTypes';

export interface SavedEvent {
  id: number;
  name: string;
  date: string;
  location: string;
}

export interface SavedEventState {
  loading: boolean;
  savedEvents: SavedEvent[];
  error: string | null;
}

const initialState: SavedEventState = {
  loading: false,
  savedEvents: [],
  error: null,
};

const savedEventReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_SAVED_EVENT_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_SAVED_EVENT_SUCCESS:
      return { ...state, loading: false, savedEvents: [...state.savedEvents, action.payload] };
    case ADD_SAVED_EVENT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LIST_SAVED_EVENTS_REQUEST:
      return { ...state, loading: true, error: null };
    case LIST_SAVED_EVENTS_SUCCESS:
      return { ...state, loading: false, savedEvents: action.payload };
    case LIST_SAVED_EVENTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default savedEventReducer;