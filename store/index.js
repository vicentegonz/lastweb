import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userReducer';
import eventsReducer from './events/eventsReducer';
import storeStatsReducer from './storeStats/storeStatsReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventsReducer,
    storeStats: storeStatsReducer,
  },
});

export default store;
