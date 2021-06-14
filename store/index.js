import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userReducer';
import eventsReducer from './events/eventsReducer';
import storeStatsReducer from './storeStats/storeStatsReducer';
import storeServicesReducer from './storeServices/storeServicesReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventsReducer,
    storeStats: storeStatsReducer,
    storeServices: storeServicesReducer,
  },
});

export default store;
