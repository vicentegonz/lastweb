import {
  createSlice,
} from '@reduxjs/toolkit';

const initialState = {
  status: null,
  eventsData: [],
  stores: [],
  selectedNotification: null,
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    save: (state, action) => {
      state.status = true;
      if (!state.stores.includes(action.payload.store)) {
        state.stores.push(action.payload.store);
        state.eventsData = state.eventsData.concat(action.payload.data);
      }
    },
    clear: (state) => {
      state.status = null;
      state.eventsData = [];
      state.selectedNotification = null;
      state.stores = [];
    },
    changeNotification: (state, action) => {
      state.selectedNotification = action.payload;
    },
  },
});

export const {
  save,
  clear,
  changeNotification,
} = eventsSlice.actions;

export const selectEvents = (state) => state.events;

export default eventsSlice.reducer;
