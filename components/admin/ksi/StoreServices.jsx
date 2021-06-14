import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectStoreServices } from '@/store/storeServices/storeServicesReducer';

import { Row, Col } from 'antd';

import styles from './ksi.module.scss';
import ReportCard from './ReportsCard.jsx';

const getDayData = (uniqueServices, initialData, day) => {
  const result = [];
  uniqueServices.forEach((stat) => {
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

const StoreServices = () => {
  const storeServices = useSelector(selectStoreServices);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    if (!storeServices.servicesData
      || Object.keys(storeServices.servicesData).length === 0
      || !storeServices.selectedStore) {
      return;
    }

    const initialData = storeServices.servicesData[storeServices.selectedStore];
    const uniqueServices = [...new Set(initialData.map((item) => item.name))];
    const today = new Date(Math.max.apply(null, initialData.map((e) => new Date(e.date))));
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    const finalData = getDayData(uniqueServices, initialData, today);
    const yesterdayData = getDayData(uniqueServices, initialData, yesterday);
    const lastWeekData = getDayData(uniqueServices, initialData, lastWeek);

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
  }, [storeServices]);

  return (
    <>
      <Row justify="space-around" align="top">
        <Col span={11} className={styles.servicesCard}>
          <ReportCard
            key="Promedio KSI"
            name="Promedio KSI"
            value={6}
            createdAt="2021-09-08"
            differenceYesterdayPct={-0.10}
            differenceLastWeekPct={0.15}
            differenceYesterdayVal={0.6}
            differenceLastWeekVal={0.9}
          />
        </Col>
      </Row>
      <Row justify="space-between" align="top">
        {
          cardData.map((item) => (
            <Col span={11} className={styles.servicesCard} key={item.id}>
              <ReportCard
                key={item.id}
                name={item.name}
                value={item.value}
                createdAt={item.date}
                differenceYesterdayPct={item.differenceYesterdayPct}
                differenceLastWeekPct={item.differenceLastWeekPct}
                differenceYesterdayVal={item.differenceYesterdayVal}
                differenceLastWeekVal={item.differenceLastWeekVal}
              />
            </Col>
          ))
        }
      </Row>
    </>
  );
};

export default StoreServices;
