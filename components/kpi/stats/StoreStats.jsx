/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectStoreStats } from '@/store/storeStats/storeStatsReducer';

import { Carousel, Space } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import styles from '../kpi.module.scss';

import ReportCard from './ReportsCard.jsx';

const getDayData = (uniqueStats, initialData, day) => {
  const result = [];
  uniqueStats.forEach((stat) => {
    const item = initialData.filter(
      (el) => el.category === stat
        && new Date(el.date).toLocaleDateString() === day.toLocaleDateString(),
    ).pop();
    result.push(item);
  });
  return result;
};

const addValueToObject = (data, value) => ({
  ...data,
  ...value,
});

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
  const [cardData, setCardData] = useState([]);

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

    const uniqueStats = [...new Set(initialData.map((item) => item.category))];
    const today = new Date(Math.max.apply(null, initialData.map((e) => new Date(e.date))));
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    const finalData = getDayData(uniqueStats, initialData, today);
    const yesterdayData = getDayData(uniqueStats, initialData, yesterday);
    const lastWeekData = getDayData(uniqueStats, initialData, lastWeek);

    finalData.forEach((data, i) => {
      const YesterdayPctDiff = {
        differenceYesterdayPct: data.value / yesterdayData[i].value
        - 1,
      };
      const LastWeekPctDiff = { differenceLastWeekPct: data.value / lastWeekData[i].value - 1 };
      const YesterdayValDiff = {
        differenceYesterdayVal:
        Math.abs(data.value - yesterdayData[i].value),
      };
      const LastWeekValDiff = {
        differenceLastWeekVal:
        Math.abs(data.value - lastWeekData[i].value),
      };

      finalData[i] = addValueToObject(data, YesterdayPctDiff);
      finalData[i] = addValueToObject(finalData[i], LastWeekPctDiff);
      finalData[i] = addValueToObject(finalData[i], YesterdayValDiff);
      finalData[i] = addValueToObject(finalData[i], LastWeekValDiff);
    });
    setCardData(finalData);
  }, [storeStats.statsData, storeStats.selectedStore,
    storeStats.selectedKPI, storeStats.selectedCategory]);

  return (
    <Space direction="vertical" className={styles.parentWidth} size="large">
      <Carousel
        className={styles.customCarousel}
        autoplay
        arrows
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
      >
        {
          cardData.map((item) => (
            <ReportCard
              key={item.name}
              name={item.name}
              value={item.value}
              createdAt={item.date}
              differenceYesterdayPct={item.differenceYesterdayPct}
              differenceLastWeekPct={item.differenceLastWeekPct}
              differenceYesterdayVal={item.differenceYesterdayVal}
              differenceLastWeekVal={item.differenceLastWeekVal}
              category={item.category}
            />
          ))
        }
      </Carousel>

      {cardData[0] && (
      <ReportCard
        key={cardData[0].name}
        name={cardData[0].name}
        value={cardData[0].value}
        createdAt={cardData[0].date}
        differenceYesterdayPct={cardData[0].differenceYesterdayPct}
        differenceLastWeekPct={cardData[0].differenceLastWeekPct}
        differenceYesterdayVal={cardData[0].differenceYesterdayVal}
        differenceLastWeekVal={cardData[0].differenceLastWeekVal}
        category={cardData[0].category}
      />
      )}

    </Space>
  );
};

export default StoreStats;
