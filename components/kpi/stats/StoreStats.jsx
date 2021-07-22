/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectStoreStats } from '@/store/storeStats/storeStatsReducer';
import { selectUser } from '@/store/user/userReducer';

import { Carousel, Space } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import styles from '../kpi.module.scss';

import ReportCard from './ReportsCard.jsx';

const NextArrow = ({ currentSlide, slideCount, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <div {...props}>
    <ArrowRightOutlined />
  </div>
);

const PrevArrow = ({ currentSlide, slideCount, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <div {...props}>
    <ArrowLeftOutlined />
  </div>
);

const StoreStats = () => {
  const storeStats = useSelector(selectStoreStats);
  const user = useSelector(selectUser);
  const [cardData, setCardData] = useState([]);
  const [summaryData, setSummaryData] = useState();

  useEffect(() => {
    if (!storeStats.statsData || !user.selectedStore
      || !storeStats.selectedKPI
      || storeStats.summaryKPIs.length === 0) {
      return;
    }

    let initialData = storeStats.statsData[user.selectedStore][storeStats.selectedKPI];

    if (storeStats.selectedCategory) {
      initialData = Object.values(initialData).filter(
        (item) => item.category === storeStats.selectedCategory,
      );
    }

    setCardData(initialData);
    const sumData = storeStats.summaryKPIs[user.selectedStore].filter(
      (el) => el.name === storeStats.selectedKPI,
    ).pop();
    setSummaryData(sumData);
  }, [storeStats.statsData, user.selectedStore,
    storeStats.selectedKPI, storeStats.selectedCategory, storeStats.summaryKPIs]);

  return (
    <Space direction="vertical" className={styles.parentWidth} size="large">
      <Carousel
        className={styles.customCarousel}
        arrows
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
      >
        {
          Object.entries(cardData).map((item) => (
            <ReportCard
              key={item[1].name}
              name={item[1].name}
              value={item[1].value}
              createdAt={user.dateRange[1]}
              differenceYesterdayPct={item[1].variationYpercentage}
              differenceLastWeekPct={item[1].variationLWpercentage}
              differenceYesterdayVal={item[1].variationYNumber}
              differenceLastWeekVal={item[1].variationLWNumber}
              category={item[1].category}
              unit={item[1].units}
            />
          ))
        }
      </Carousel>

      {(summaryData) && (
      <ReportCard
        name={summaryData.name}
        value={parseFloat(summaryData.value)}
        createdAt={user.dateRange[1]}
        differenceYesterdayPct={summaryData.variationYpercentage}
        differenceLastWeekPct={summaryData.variationLWpercentage}
        differenceYesterdayVal={summaryData.variationYNumber}
        differenceLastWeekVal={summaryData.variationLWNumber}
        unit={summaryData.units}
        poa={summaryData.poa}
      />
      )}

    </Space>
  );
};

export default StoreStats;
