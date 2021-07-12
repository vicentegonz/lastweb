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
    if (!storeStats.chartKPIs
      || Object.keys(storeStats.chartKPIs).length === 0
      || !selectedStore
      || !storeStats.selectedKPI) {
      return;
    }

    const initialData = storeStats.chartKPIs[selectedStore];

    let processedData = [];

    const kpis = {
      Contribución: 'contribution',
      'Venta Bruta': 'grossSale',
      'Venta Neta': 'netSale',
      'Ticket promedio': 'averageTicket',
      Transacciones: 'transactions',
    };

    initialData.forEach((dategroup) => {
      dategroup.forEach((item) => {
        processedData.push({
          id: item.id,
          name: storeStats.selectedKPI,
          category: item.category,
          value: item[kpis[storeStats.selectedKPI]],
          date: item.date,
        });
      });
    });

    if (storeStats.selectedCategory) {
      processedData = processedData.filter(
        (el) => el.category === storeStats.selectedCategory,
      );
    }

    const filtered = processedData.filter(
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
