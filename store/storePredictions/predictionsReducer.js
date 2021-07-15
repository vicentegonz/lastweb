import {
  createSlice,
} from '@reduxjs/toolkit';

const getToday = () => {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const offsetToday = new Date(today.getTime() - (offset * 60 * 1000));

  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  const offsetWeek = new Date(nextWeek.getTime() - (offset * 60 * 1000));

  const parsedToday = offsetToday.toISOString().split('T')[0];
  const parsedNextWeek = offsetWeek.toISOString().split('T')[0];

  return [parsedToday, parsedNextWeek];
};

const initialState = {
  storeProducts: {},
  storePredictions: {},
  date: getToday(),
  days: 3,
  summaryPredictions: {},
  selectedProduct: null,
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
        const data = action.payload.data[0];
        state.storePredictions[action.payload.store][action.payload.product] = data;
      }
    },
    clearStoreProducts: (state) => {
      state.storeProducts = {};
    },
    changeStore: (state, action) => {
      state.selectedStore = action.payload;
    },
    changeDate: (state, action) => {
      state.date = action.payload;
    },
    changeDays: (state, action) => {
      state.days = action.payload;
    },
    changeProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const {
  saveProducts,
  clearStoreProducts,
  changeStore,
  changeDate,
  changeDays,
  savePredictions,
  changeProduct,
} = storePredictionSlice.actions;

export const selectStorePredictions = (state) => state.storePredictions;
export default storePredictionSlice.reducer;
