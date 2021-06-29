import {
  createSlice,
} from '@reduxjs/toolkit';

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
  selectedKPI: null,
  selectedCategory: null,
  summaryKPIs: [],
};

export const storeStatsSlice = createSlice({
  name: 'storeStats',
  initialState,
  reducers: {
    calculateStatSumData: (state, action) => {
      const today = new Date(action.payload.dateRange[1]);
      const initialData = state.statsData[action.payload.selectedStore];

      if (!state.statsData
        || Object.keys(state.statsData).length === 0
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
          date: action.payload.dateRange[1],
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
    changeKPI: (state, action) => {
      state.selectedKPI = action.payload;
    },
    changeCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const {
  save,
  calculateStatSumData,
  clearStoreData,
  changeCategory,
  changeKPI,
} = storeStatsSlice.actions;

export const selectStoreStats = (state) => state.storeStats;

export default storeStatsSlice.reducer;
