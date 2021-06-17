import {
  createSlice,
} from '@reduxjs/toolkit';

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

const getDataValue = (data) => {
  let totalSurveys = 0;
  let totalValue = 0;
  data.forEach((stat) => {
    totalSurveys += stat.amountOfSurveys;
    totalValue += stat.value * stat.amountOfSurveys;
  });
  return (totalValue / totalSurveys).toFixed(2);
};

const getDayData = (uniqueServices, initialData, day) => {
  const result = [];
  uniqueServices.forEach((stat) => {
    const item = initialData.filter(
      (el) => el.name === stat
      && new Date(el.date).toLocaleDateString() === day.toLocaleDateString(),
    ).pop();

    result.push(item);
  });
  return getDataValue(result);
};

const initialState = {
  servicesData: {},
  selectedStore: null,
  summaryKsi: {},
  dateRange: getToday(),
};

export const storeServicesSlice = createSlice({
  name: 'storeServices',
  initialState,
  reducers: {
    calculateSumData: (state) => {
      const today = new Date(state.dateRange[1]);
      const initialData = state.servicesData[state.selectedStore];
      if (!state.servicesData
              || Object.keys(state.servicesData).length === 0
              || !state.selectedStore
              || !initialData) {
        return;
      }
      const uniqueServices = [...new Set(initialData.map((item) => item.name))];
      const minDate = new Date(Math.min.apply(null, initialData.map((e) => new Date(e.date))));

      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      if (yesterday < minDate) {
        yesterday.setDate(minDate.getDate());
      }

      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      if (lastWeek < minDate) {
        lastWeek.setDate(minDate.getDate());
      }

      const todayData = getDayData(uniqueServices, initialData, today);
      const yesterdayData = getDayData(uniqueServices, initialData, yesterday);
      const lastWeekData = getDayData(uniqueServices, initialData, lastWeek);

      const YesterdayPctDiff = todayData / yesterdayData - 1;
      const LastWeekPctDiff = todayData / lastWeekData - 1;
      const YesterdayValDiff = Math.abs(todayData - yesterdayData);

      const LastWeekValDiff = Math.abs(todayData - lastWeekData);
      state.summaryKsi = {
        name: 'Nota Final',
        value: todayData,
        date: state.dateRange[1],
        store: state.selectedStore,
        differenceYesterdayPct: YesterdayPctDiff,
        differenceLastWeekPct: LastWeekPctDiff,
        differenceYesterdayVal: YesterdayValDiff,
        differenceLastWeekVal: LastWeekValDiff,
      };
    },
    saveServices: (state, action) => {
      if (!state.servicesData[action.payload.store]) {
        state.servicesData[action.payload.store] = action.payload.data;
      }
    },
    clearStoreServiceData: (state) => {
      state.servicesData = {};
    },
    changeStatStore: (state, action) => {
      state.selectedStore = action.payload;
    },
    changeDateRangeServices: (state, action) => {
      state.dateRange = action.payload;
    },
  },
});

export const {
  changeDateRangeServices,
  saveServices,
  calculateSumData,
  clearStoreServiceData,
  changeStatStore,
  changeDateRange,
} = storeServicesSlice.actions;

export const selectStoreServices = (state) => state.storeServices;

export default storeServicesSlice.reducer;
