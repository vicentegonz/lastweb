import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import api from '@/api';
import dateDifference from '@/utils/dateFunctions';
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
      while (allRequested) {
        // eslint-disable-next-line no-await-in-loop
        response = await api.account.ksiData(requestParams);
        processedData.data.push(...response.data.results);

        requestParams.page += 1;
        allRequested = null;
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
};

export const storeServicesSlice = createSlice({
  name: 'storeServices',
  initialState,
  reducers: {
    clearStoreServiceData: (state) => {
      state.servicesData = {};
    },
  },
  extraReducers: {
    [getDataFromApi.fulfilled]: (state, action) => {
      const data = action.payload;
      const { mainService, npsService, aux } = processKSI(data.data);
      state.servicesData[data.store] = aux;
      state.summaryKsi[data.store] = mainService;
      state.npsKsi[data.store] = npsService;
    },
  },
});

export const {
  saveServices,
  calculateSumData,
  clearStoreServiceData,
} = storeServicesSlice.actions;

export const selectStoreServices = (state) => state.storeServices;

export default storeServicesSlice.reducer;
