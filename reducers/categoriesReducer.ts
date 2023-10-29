import { CategoriesActionTypes } from '../actions/categoriesActions';
import * as ActionTypes from '../actions/actionTypes';

interface CategoriesState {
  selectedCategories: string[];
  submittedCategories: string[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  selectedCategories: [],
  submittedCategories: [],
  loading: false,
  error: null,
};

const categoriesReducer = (state = initialState, action: CategoriesActionTypes) : CategoriesState => {
  switch (action.type) {
    case ActionTypes.TOGGLE_CATEGORY:
      const categoryExists = state.selectedCategories.includes(action.payload);
      if (categoryExists) {
        // If the category exists, remove it from the array
        return {
          ...state,
          selectedCategories: state.selectedCategories.filter(category => category !== action.payload)
        };
      } else {
        // If the category doesn't exist, add it to the array
        return {
          ...state,
          selectedCategories: [...state.selectedCategories, action.payload]
        };
      }
    case ActionTypes.SUBMIT_CATEGORIES_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.SUBMIT_CATEGORIES_SUCCESS:
      return { ...state, loading: false };
    case ActionTypes.SUBMIT_CATEGORIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ActionTypes.LOAD_CATEGORIES_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.LOAD_CATEGORIES_SUCCESS:
      return { ...state, loading: false, submittedCategories: action.payload };
    case ActionTypes.LOAD_CATEGORIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default categoriesReducer;
