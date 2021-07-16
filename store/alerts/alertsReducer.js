import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import api from '@/api';

export const getAlertDataFromApi = createAsyncThunk(
  'alerts/getAlertDataFromApi',
  async (data) => {
    const store = data;
    try {
      const processedData = {};
      processedData.store = store;
      processedData.data = [];

      const requestParams = {
        id: store,
        size: 15,
        page: 1,
      };

      let response;
      let allRequested = true;
      while (allRequested) {
        // eslint-disable-next-line no-await-in-loop
        response = await api.account.alertsData(requestParams);
        processedData.data.push(...response.data.results);

        requestParams.page += 1;
        allRequested = response.data.links.next;
      }
      return processedData;
    } catch (err) {
      return false;
    }
  },
);

const initialState = {
  status: null,
  alertsData: {},
  stores: [],
  selectedAlert: null,
  loading: true,
};

export const alertSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    clearAlerts: (state) => {
      state.status = null;
      state.alertsData = {};
      state.selectedAlert = null;
      state.stores = [];
    },
    changeAlert: (state, action) => {
      state.selectedAlert = action.payload;
    },
    startLoadingAlerts: (state) => {
      state.loading = true;
    },
  },
  extraReducers: {
    [getAlertDataFromApi.fulfilled]: (state, action) => {
      const data = action.payload;
      state.alertsData[data.store] = data.data;
      state.loading = false;
    },
  },
});

export const {
  clearAlerts,
  changeAlert,
  startLoadingAlerts,
} = alertSlice.actions;

export const selectAlerts = (state) => state.alerts;

export default alertSlice.reducer;
