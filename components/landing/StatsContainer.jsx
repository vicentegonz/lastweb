import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectStoreStats } from '@/store/storeStats/storeStatsReducer';
import ReportCard from './ReportsCard.jsx';

const StoreStats = () => {
  const storeStats = useSelector(selectStoreStats);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    if (!storeStats.statsData
      || Object.keys(storeStats.statsData).length === 0
      || !storeStats.selectedStore) {
      return;
    }
    const initialData = storeStats.statsData[storeStats.selectedStore];
    const uniqueStats = [...new Set(initialData.map((item) => item.name))];
    const finalData = [];
    uniqueStats.forEach((item) => {
      const latestItem = initialData.filter((el) => el.name === item).pop();
      finalData.push(latestItem);
    });
    setCardData(finalData);
  }, [storeStats]);

  return (
    <>
      {
          cardData.map((item) => (
            <ReportCard
              key={item.name}
              name={item.name}
              value={item.value}
              createdAt={item.created_at}
            />
          ))
      }
    </>
  );
};

export default StoreStats;
