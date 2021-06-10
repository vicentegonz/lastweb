import {
  createSlice,
} from '@reduxjs/toolkit';

const initialState = {
  statsData: {},
  selectedStore: null,
  dateRange: [null, null],
};

export const storeStatsSlice = createSlice({
  name: 'storeStats',
  initialState,
  reducers: {
    save: (state, action) => {
      if (!state.statsData[action.payload.store]) {
        state.statsData[action.payload.store] = action.payload.data;
      }
    },
    clearStoreData: (state) => {
      state.statsData = {};
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
} = storeStatsSlice.actions;

export const selectStoreStats = (state) => state.storeStats;

export default storeStatsSlice.reducer;
