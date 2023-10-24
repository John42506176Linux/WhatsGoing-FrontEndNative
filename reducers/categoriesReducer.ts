import { ToggleCategoryAction } from '../actions/categoriesActions';
import { TOGGLE_CATEGORY } from '../actions/actionTypes';

interface CategoriesState {
  selectedCategories: string[];
}

const initialState: CategoriesState = {
  selectedCategories: []
};

const categoriesReducer = (state = initialState, action: ToggleCategoryAction) : CategoriesState => {
  switch (action.type) {
    case TOGGLE_CATEGORY:
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
    default:
      return state;
  }
};

export default categoriesReducer;
