import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectStoreStats } from '@/store/storeStats/storeStatsReducer';

import { Carousel, Space } from 'antd';
import styles from '@/styles/landing.module.scss';

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

  const lastKpi = cardData[cardData.length - 1];

  return (
    <Space direction="vertical" className={styles.parentWidth} size="large">
      <Carousel className={styles.customCarousel} autoplay>
        {
          cardData.map((item) => (
            <ReportCard
              key={item.name}
              name={item.name}
              value={item.value}
              createdAt={item.date}
            />
          ))
        }
      </Carousel>

      {lastKpi
        && (
        <ReportCard
          key={lastKpi.name}
          name={lastKpi.name}
          value={lastKpi.value}
          createdAt={lastKpi.date}
        />
        )}

    </Space>
  );
};

export default StoreStats;
