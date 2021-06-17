/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectStoreStats } from '@/store/storeStats/storeStatsReducer';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

import { Carousel, Space } from 'antd';

import ReportCard from '@/components/kpi/stats/ReportsCard.jsx';
import styles from '../landing.module.scss';

const getDayData = (uniqueStats, initialData, day) => {
  const result = [];
  uniqueStats.forEach((stat) => {
    const item = initialData.filter(
      (el) => el.name === stat
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

const KPIStats = () => {
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

    const today = new Date(storeStats.dateRange[1]);
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

    const finalData = getDayData(uniqueStats, initialData, today);
    const yesterdayData = getDayData(uniqueStats, initialData, yesterday);
    const lastWeekData = getDayData(uniqueStats, initialData, lastWeek);

    if (finalData.includes(undefined)
    || yesterdayData.includes(undefined)
    || lastWeekData.includes(undefined)) {
      return;
    }

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
  }, [storeStats]);

  return (
    <Space direction="vertical" className={styles.parentWidth} size="large">
      <Carousel
        className={styles.landingCarousel}
        arrows
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
        slidesToShow={2}
        dots={false}
        frameOverflow="invisible"
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
              unit={item.units}
            />
          ))
        }
      </Carousel>
    </Space>
  );
};

export default KPIStats;
