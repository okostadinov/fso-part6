import { configureStore } from '@reduxjs/toolkit';
import anecdotesReducer from './reducers/anecdotesReducer';
import filterReducer from './reducers/filterReducer';
import notificationReducer from './reducers/notificationReducer';

export default configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    notification: notificationReducer,
    filter: filterReducer,
  },
});
