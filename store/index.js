import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userReducer';
import eventsReducer from './events/eventsReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventsReducer,
  },
});

export default store;
