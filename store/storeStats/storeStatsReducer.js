import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import api from '@/api';
import { processStoreKpis } from './processKPI';

export const getKPIDataFromApi = createAsyncThunk(
  'storeServices/getKPIDataFromApi',
  async (data) => {
    const [store, startDate, endDate] = data;
    try {
      const processedData = {};
      processedData.store = store;
      processedData.dates = [startDate, endDate];
      processedData.data = [];

      const requestParams = {
        id: store,
        start_date: startDate,
        end_date: endDate,
        size: 15,
        page: 1,
      };

      let response;
      let allRequested = true;
      processedData.store = store;
      while (allRequested) {
        // eslint-disable-next-line no-await-in-loop
        response = await api.account.kpiData(requestParams);
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
  statsData: {},
  selectedKPI: null,
  selectedCategory: null,
  summaryKPIs: {},
  chartKPIs: {},
  loading: true,
};

export const storeStatsSlice = createSlice({
  name: 'storeStats',
  initialState,
  reducers: {
    clearStoreStatsData: (state) => {
      state.statsData = {};
      state.summaryKPIs = {};
      state.chartKPIs = {};
    },
    changeKPI: (state, action) => {
      state.selectedKPI = action.payload;
    },
    changeCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    startLoadingKPI: (state) => {
      state.loading = true;
    },
  },
  extraReducers: {
    [getKPIDataFromApi.fulfilled]: (state, action) => {
      const data = action.payload;
      const processedIndividualKPI = processStoreKpis(data);
      if (processedIndividualKPI) {
        state.chartKPIs[data.store] = processedIndividualKPI.filteredArray.reverse();
        state.statsData[data.store] = processedIndividualKPI.filteredData;
        state.summaryKPIs[data.store] = processedIndividualKPI.mainKPI;
      }
      state.loading = false;
    },
  },
});

export const {
  clearStoreStatsData,
  changeCategory,
  changeKPI,
  startLoadingKPI,
} = storeStatsSlice.actions;

export const selectStoreStats = (state) => state.storeStats;

export default storeStatsSlice.reducer;
