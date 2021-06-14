import {
  createSlice,
} from '@reduxjs/toolkit';

const initialState = {
  servicesData: {},
  selectedStore: null,
  dateRange: [null, null],
};

export const storeServicesSlice = createSlice({
  name: 'storeServices',
  initialState,
  reducers: {
    save: (state, action) => {
      if (!state.servicesData[action.payload.store]) {
        state.servicesData[action.payload.store] = action.payload.data;
      }
    },
    clearStoreData: (state) => {
      state.servicesData = {};
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
  save,
  clearStoreData,
  changeStore,
  changeDateRange,
} = storeServicesSlice.actions;

export const selectStoreServices = (state) => state.storeServices;

export default storeServicesSlice.reducer;
