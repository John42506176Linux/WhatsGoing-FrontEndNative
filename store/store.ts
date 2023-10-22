import { configureStore } from '@reduxjs/toolkit';
import eventReducer from '../reducers/eventReducer';
import locationReducer from '../reducers/locationReducer';
import categoriesReducer from '../reducers/categoriesReducer';
import savedEventReducer from '../reducers/savedEventReducer';
import userReducer from '../reducers/userReducer';

const store = configureStore({
  reducer: {
    events: eventReducer,
    location: locationReducer,
    categories: categoriesReducer,
    savedEvents: savedEventReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
