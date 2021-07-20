import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userReducer';
import alertsReducer from './alerts/alertsReducer';
import storeStatsReducer from './storeStats/storeStatsReducer';
import storeServicesReducer from './storeServices/storeServicesReducer';
import predictionsReducer from './storePredictions/predictionsReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    alerts: alertsReducer,
    storeStats: storeStatsReducer,
    storeServices: storeServicesReducer,
    storePredictions: predictionsReducer,
  },
});

export default store;
