import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: null,
  email: null,
  givenName: null,
  role: null,
  stores: null,
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
    },
  },
});

export const { save, clear } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
