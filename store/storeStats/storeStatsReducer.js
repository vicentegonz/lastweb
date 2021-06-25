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
  let totalValue = 0;
  data.forEach((stat) => {
    totalValue += stat.value;
  });
  return totalValue;
};

const getDayData = (uniqueCategories, stat, initialData, day) => {
  const result = [];
  uniqueCategories.forEach((category) => {
    const item = initialData.filter(
      (el) => el.name === stat
      && el.category === category
      && new Date(el.date).toLocaleDateString() === day.toLocaleDateString(),
    ).pop();

    result.push(item);
  });
  return getDataValue(result);
};

const initialState = {
  statsData: {},
  selectedStore: null,
  selectedKPI: null,
  selectedCategory: null,
  dateRange: getToday(),
  summaryKPIs: [],
};

export const storeStatsSlice = createSlice({
  name: 'storeStats',
  initialState,
  reducers: {
    calculateStatSumData: (state) => {
      const today = new Date(state.dateRange[1]);
      const initialData = state.statsData[state.selectedStore];
      if (!state.statsData
        || Object.keys(state.statsData).length === 0
        || !state.selectedStore
        || !initialData) {
        return;
      }
      const uniqueCategories = [...new Set(initialData.map((item) => item.category))];
      const uniqueStat = [...new Set(initialData.map((item) => item.name))];
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
      const result = [];
      uniqueStat.forEach((stat) => {
        const unit = initialData.filter(
          (el) => el.name === stat,
        ).pop().units;
        const todayData = getDayData(uniqueCategories, stat, initialData, today);
        const yesterdayData = getDayData(uniqueCategories, stat, initialData, yesterday);
        const lastWeekData = getDayData(uniqueCategories, stat, initialData, lastWeek);

        const YesterdayPctDiff = todayData / yesterdayData - 1;
        const LastWeekPctDiff = todayData / lastWeekData - 1;
        const YesterdayValDiff = Math.abs(todayData - yesterdayData);
        const LastWeekValDiff = Math.abs(todayData - lastWeekData);

        result.push({
          name: stat,
          units: unit,
          value: todayData,
          date: state.dateRange[1],
          store: state.selectedStore,
          differenceYesterdayPct: YesterdayPctDiff,
          differenceLastWeekPct: LastWeekPctDiff,
          differenceYesterdayVal: YesterdayValDiff,
          differenceLastWeekVal: LastWeekValDiff,
        });
      });
      state.summaryKPIs = result;
    },
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
    changeKPI: (state, action) => {
      state.selectedKPI = action.payload;
    },
    changeCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    changeDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
  },
});

export const {
  save,
  calculateStatSumData,
  clearStoreData,
  changeStore,
  changeCategory,
  changeDateRange,
  changeKPI,
} = storeStatsSlice.actions;

export const selectStoreStats = (state) => state.storeStats;

export default storeStatsSlice.reducer;
