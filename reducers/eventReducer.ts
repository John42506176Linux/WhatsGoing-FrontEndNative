import * as ActionTypes from '../actions/actionTypes';
import { EventActionTypes } from '../actions/eventActions';

interface EventState {
  loading: boolean;
  data: any;  // Define a more specific type based on your data structure
  error: string | null;
}

const initialState: EventState = {
  loading: true,
  data: [],
  error: null,
};

const eventReducer = (state = initialState, action: EventActionTypes): EventState => {
  
  switch (action.type) {
    case ActionTypes.FETCH_EVENT_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.FETCH_EVENT_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case ActionTypes.FETCH_EVENT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ActionTypes.FETCH_EVENT_TIMEOUT:
      return { ...state, loading: false, error: 'Network request timed out' };
    case ActionTypes.FETCH_EVENT_CONNECTION_ERROR:
      return { ...state, loading: false, error: 'Error connecting to the server' };
    case ActionTypes.FETCH_EVENT_SERVER_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ActionTypes.UPDATE_EVENT_SAVED:
      return {
        ...state,
        data: state.data.map((event: { id: string; is_saved: boolean }) => 
          event.id === action.payload.eventId ? { ...event, is_saved: action.payload.isSaved } : event
        ),
      };
    default:
      return state;
  }
};

export default eventReducer;
