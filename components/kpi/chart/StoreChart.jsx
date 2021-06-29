import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectStoreStats } from '@/store/storeStats/storeStatsReducer';
import { selectUser } from '@/store/user/userReducer';
import DummyRecapChart from './DummyRecapChart.jsx';

const StoreChart = () => {
  const storeStats = useSelector(selectStoreStats);
  const { selectedStore, dateRange } = useSelector(selectUser);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!storeStats.statsData
      || Object.keys(storeStats.statsData).length === 0
      || !selectedStore
      || !storeStats.selectedKPI) {
      return;
    }

    let initialData = storeStats.statsData[selectedStore].filter(
      (el) => el.name === storeStats.selectedKPI,
    );

    if (storeStats.selectedCategory) {
      initialData = initialData.filter(
        (el) => el.category === storeStats.selectedCategory,
      );
    }

    const filtered = initialData.filter(
      (el) => new Date(el.date) >= new Date(dateRange[0])
              && new Date(el.date) <= new Date(dateRange[1]),
    );

    setChartData(filtered);
  }, [storeStats, selectedStore, dateRange]);

  return (
    <DummyRecapChart chartData={chartData} />
  );
};

export default StoreChart;
