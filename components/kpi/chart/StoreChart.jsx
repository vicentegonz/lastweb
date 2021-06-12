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
      || !storeStats.selectedStore) {
      return;
    }

    const currentData = storeStats.statsData[storeStats.selectedStore];
    const filtered = currentData.filter(
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
