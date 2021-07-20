import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import api from '@/api';
import { dateDifference } from '@/utils/dateFunctions';
import processKSI from './processKSI';

export const getDataFromApi = createAsyncThunk(
  'storeServices/getDataFromApi',
  async (data) => {
    const [store, startDate, endDate] = data;
    try {
      const processedData = {};
      processedData.store = store;
      processedData.data = [];

      const requestParams = {
        id: store,
        start_date: startDate,
        end_date: endDate,
        size: Math.min(15, dateDifference(startDate, endDate)),
        page: 1,
      };

      let response;
      let allRequested = true;
      processedData.store = store;
      processedData.startDate = startDate;
      processedData.endDate = endDate;
      while (allRequested) {
        // eslint-disable-next-line no-await-in-loop
        response = await api.account.ksiData(requestParams);
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
  servicesData: {},
  summaryKsi: {},
  npsKsi: {},
  loading: false,
};

export const storeServicesSlice = createSlice({
  name: 'storeServices',
  initialState,
  reducers: {
    clearStoreServiceData: (state) => {
      state.servicesData = {};
    },
    startLoadingKSI: (state) => {
      state.loading = true;
    },
  },
  extraReducers: {
    [getDataFromApi.fulfilled]: (state, action) => {
      const data = action.payload;
      const processedKSI = processKSI(data);
      if (processedKSI) {
        state.servicesData[data.store] = processedKSI.aux;
        state.summaryKsi[data.store] = processedKSI.mainService;
        state.npsKsi[data.store] = processedKSI.npsService;
      }
      state.loading = false;
    },
  },
});

export const {
  clearStoreServiceData,
  startLoadingKSI,
} = storeServicesSlice.actions;

export const selectStoreServices = (state) => state.storeServices;

export default storeServicesSlice.reducer;
