import { createSlice } from '@reduxjs/toolkit';

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
  status: null,
  email: null,
  givenName: null,
  role: null,
  stores: null,
  selectedStore: null,
  dateRange: getToday(),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    save: (state, action) => {
      state.status = true;
      state.email = action.payload.email;
      state.givenName = action.payload.givenName;
      state.role = action.payload.role;
      state.stores = action.payload.stores;
    },
    clear: (state) => {
      state.status = null;
      state.email = null;
      state.givenName = null;
      state.role = null;
      state.stores = null;
      state.selectedStore = null;
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
  clear,
  changeStore,
  changeDateRange,
} = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
