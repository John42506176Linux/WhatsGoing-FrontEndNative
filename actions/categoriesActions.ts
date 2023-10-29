import * as ActionTypes from './actionTypes';
import { DataStore } from "aws-amplify";
import { Category } from "../src/models/index";

export interface ToggleCategoryAction {
  type: typeof ActionTypes.TOGGLE_CATEGORY;
  payload: string;
}

interface SubmitCategoriesRequestAction {
  type: typeof ActionTypes.SUBMIT_CATEGORIES_REQUEST;
}

interface SubmitCategoriesSuccessAction {
  type: typeof ActionTypes.SUBMIT_CATEGORIES_SUCCESS;
  payload: string[];
}

interface SubmitCategoriesFailureAction {
  type: typeof ActionTypes.SUBMIT_CATEGORIES_FAILURE;
  payload: string;
}

interface LoadCategoriesRequestAction {
  type: typeof ActionTypes.LOAD_CATEGORIES_REQUEST;
}

interface LoadCategoriesSuccessAction {
  type: typeof ActionTypes.LOAD_CATEGORIES_SUCCESS;
  payload: string[];
}

interface LoadCategoriesFailureAction {
  type: typeof ActionTypes.LOAD_CATEGORIES_FAILURE;
  payload: string;
}

export type CategoriesActionTypes =
  | ToggleCategoryAction
  | SubmitCategoriesRequestAction
  | SubmitCategoriesSuccessAction
  | SubmitCategoriesFailureAction
  | LoadCategoriesRequestAction
  | LoadCategoriesSuccessAction
  | LoadCategoriesFailureAction;

export const submitCategoriesRequest = (): SubmitCategoriesRequestAction => ({
  type: ActionTypes.SUBMIT_CATEGORIES_REQUEST,
});

export const submitCategoriesSuccess = (submittedCategories: string[]): SubmitCategoriesSuccessAction => ({
  type: ActionTypes.SUBMIT_CATEGORIES_SUCCESS,
  payload: submittedCategories,
});

export const submitCategoriesFailure = (error: string): SubmitCategoriesFailureAction => ({
  type: ActionTypes.SUBMIT_CATEGORIES_FAILURE,
  payload: error,
});

export const loadCategoriesRequest = (): LoadCategoriesRequestAction => ({
  type: ActionTypes.LOAD_CATEGORIES_REQUEST,
});

export const loadCategoriesSuccess = (categories: string[]): LoadCategoriesSuccessAction => ({
  type: ActionTypes.LOAD_CATEGORIES_SUCCESS,
  payload: categories,
});

export const loadCategoriesFailure = (error: string): LoadCategoriesFailureAction => ({
  type: ActionTypes.LOAD_CATEGORIES_FAILURE,
  payload: error,
});

export const toggleCategory = (categoryName: string): ToggleCategoryAction => (
{
  type: ActionTypes.TOGGLE_CATEGORY,
  payload: categoryName
});

export const submitCategories = () => {
  return async (dispatch: any, getState: any) => {
    dispatch(submitCategoriesRequest());
    const { categories } = getState();
    const selectedCategories = categories.selectedCategories; 

    try {
      // Create an array of promises
      const promises = selectedCategories.map((category: string) => {
        const categoryToSave = new Category({
          name: category,
        });

        return DataStore.save(categoryToSave);
      });
      await Promise.all(promises); // Wait for all promises to resolve
      dispatch(submitCategoriesSuccess(selectedCategories));
    } catch (error: any) {
      console.error('Error submitting categories: ', error);
      dispatch(submitCategoriesFailure(error.message));
    }
  };
};

export const loadCategories = () => {
  return async (dispatch: any) => {
    dispatch(loadCategoriesRequest());
    try {
      const subscription = DataStore.observeQuery(Category).subscribe(({ items }) => 
      {
        const categories = items.map((item) => item.name);
        dispatch(loadCategoriesSuccess(categories));
      });

      return () => subscription.unsubscribe();
    } catch (error: any) {
      console.error('Error loading categories: ', error);
      dispatch(loadCategoriesFailure(error.message));
    }
  };
};



