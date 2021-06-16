import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectStoreStats } from '@/store/storeStats/storeStatsReducer';
import DummyRecapChart from './DummyRecapChart.jsx';

const StoreChart = () => {
  const storeStats = useSelector(selectStoreStats);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!storeStats.statsData
      || Object.keys(storeStats.statsData).length === 0
      || !storeStats.selectedStore
      || !storeStats.selectedKPI) {
      return;
    }

    let initialData = storeStats.statsData[storeStats.selectedStore].filter(
      (el) => el.name === storeStats.selectedKPI,
    );

    if (storeStats.selectedCategory) {
      initialData = initialData.filter(
        (el) => el.category === storeStats.selectedCategory,
      );
    }

    const filtered = initialData.filter(
      (el) => new Date(el.date) >= new Date(storeStats.dateRange[0])
              && new Date(el.date) <= new Date(storeStats.dateRange[1]),
    );

    setChartData(filtered);
  }, [storeStats]);

  return (
    <DummyRecapChart chartData={chartData} />
  );
};

export default StoreChart;
