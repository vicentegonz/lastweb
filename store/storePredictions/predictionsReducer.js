import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import api from '@/api';

export const getProductDataFromApi = createAsyncThunk(
  'storePredictions/getProductDataFromApi',
  async (store) => {
    try {
      const processedData = {};

      processedData.store = store;
      processedData.data = [];

      const requestParams = {
        id: store,
        page: 1,
      };

      let response;
      let allRequested = true;

      while (allRequested) {
        // eslint-disable-next-line no-await-in-loop
        response = await api.account.productData(requestParams);
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

export const getPredictionDataFromApi = createAsyncThunk(
  'storePredictions/getPredictionDataFromApi',
  async ([store, product]) => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const offsetToday = new Date(today.getTime() - (offset * 60 * 1000));

    const parsedToday = offsetToday.toISOString().split('T')[0];

    try {
      const processedData = {};
      processedData.store = store;
      processedData.product = product.id;
      processedData.data = [];
      const requestParams = {
        product: product.id,
        store,
        date: parsedToday,
      };
      const result = await api.account.predictionData(requestParams);
      processedData.data.push(result.data);
      return processedData;
    } catch (err) {
      return false;
    }
  },
);

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
  summaryPredictions: {},
  selectedProduct: null,
  selectedProductName: null,
  loading: false,
};

export const storePredictionSlice = createSlice({
  name: 'storePredictions',
  initialState,
  reducers: {
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
    clearStorePredictions: (state) => {
      state.storePredictions = {};
    },
    changeStore: (state, action) => {
      state.selectedStore = action.payload;
    },
    changeDate: (state, action) => {
      state.date = action.payload;
    },
    changeProduct: (state, action) => {
      [state.selectedProduct, state.selectedProductName] = action.payload;
    },
    clearProduct: (state) => {
      state.selectedProduct = null;
      state.selectedProductName = null;
    },
    startLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: {
    [getProductDataFromApi.fulfilled]: (state, action) => {
      const data = action.payload;
      state.storeProducts[data.store] = data.data;
      state.loading = false;
    },
    [getPredictionDataFromApi.fulfilled]: (state, action) => {
      const data = action.payload;
      if (data) {
        if (!state.storePredictions[action.payload.store]) {
          state.storePredictions[action.payload.store] = {};
        }
        if (!state.storePredictions[action.payload.store][action.payload.product]) {
          const save = data.data[0];
          state.storePredictions[action.payload.store][action.payload.product] = save;
        }
      }
      state.loading = false;
    },
  },
});

export const {
  clearStoreProducts,
  clearStorePredictions,
  changeStore,
  changeDate,
  savePredictions,
  changeProduct,
  startLoading,
  clearProduct,
} = storePredictionSlice.actions;

export const selectStorePredictions = (state) => state.storePredictions;
export default storePredictionSlice.reducer;
