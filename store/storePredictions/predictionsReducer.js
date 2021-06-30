import {
  createSlice,
} from '@reduxjs/toolkit';

const getToday = () => {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const offsetToday = new Date(today.getTime() - (offset * 60 * 1000));

  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  const offsetWeek = new Date(lastWeek.getTime() - (offset * 60 * 1000));

  const parsedToday = offsetToday.toISOString().split('T')[0];
  const parsedLastWeek = offsetWeek.toISOString().split('T')[0];

  return [parsedLastWeek, parsedToday];
};

const initialState = {
  storeProducts: {},
  storePredictions: {},
  dateRange: getToday(),
  summaryKPIs: [],
};

export const storePredictionSlice = createSlice({
  name: 'storePredictions',
  initialState,
  reducers: {
    saveProducts: (state, action) => {
      if (!state.storeProducts[action.payload.store]) {
        state.storeProducts[action.payload.store] = action.payload.data;
      }
    },
    savePredictions: (state, action) => {
      if (!state.storePredictions[action.payload.store]) {
        state.storePredictions[action.payload.store] = {};
      }
      if (!state.storePredictions[action.payload.store][action.payload.product]) {
        state.storePredictions[action.payload.store][action.payload.product] = action.payload.data;
      }
    },
    clearStoreProducts: (state) => {
      state.storeProducts = {};
    },
    changeStore: (state, action) => {
      state.selectedStore = action.payload;
    },
    changeDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
  },
});

export const {
  saveProducts,
  clearStoreProducts,
  changeStore,
  changeDateRange,
  savePredictions,
} = storePredictionSlice.actions;

export const selectStorePredictions = (state) => state.storePredictions;

export default storePredictionSlice.reducer;
