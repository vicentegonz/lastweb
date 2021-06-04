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
    setChartData(storeStats.statsData[storeStats.selectedStore]);
  }, [storeStats]);

  return (
    <DummyRecapChart chartData={chartData} />
  );
};

export default StoreChart;
