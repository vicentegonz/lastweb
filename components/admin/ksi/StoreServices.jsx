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
  const [summaryData, setSummaryData] = useState();

  useEffect(() => {
    if (!storeServices.servicesData
      || Object.keys(storeServices.servicesData).length === 0
      || !storeServices.selectedStore
      || !storeServices.summaryKsi
      || Object.keys(storeServices.summaryKsi).length === 0) {
      return;
    }

    const initialData = storeServices.servicesData[storeServices.selectedStore];
    const uniqueServices = [...new Set(initialData.map((item) => item.name))];

    const today = new Date(storeServices.dateRange[1]);
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
    const sumData = storeServices.summaryKsi;
    let nanValue = true;
    Object.entries(sumData).forEach(([key, value]) => {
      if (!(['name', 'date'].includes(key))) {
        if (Number.isNaN(Number(value))) {
          nanValue = false;
        }
      }
    });
    if (nanValue) {
      setSummaryData(sumData);
    }
    setCardData(finalData);
  }, [storeServices]);
  return (
    <>
      <Row justify="space-around" align="top">
        {(summaryData) && (
        <Col span={11} className={styles.servicesCard}>
          <ReportCard
            name={summaryData.name}
            value={parseFloat(summaryData.value)}
            createdAt={summaryData.date}
            differenceYesterdayPct={summaryData.differenceYesterdayPct}
            differenceLastWeekPct={summaryData.differenceLastWeekPct}
            differenceYesterdayVal={summaryData.differenceYesterdayVal}
            differenceLastWeekVal={summaryData.differenceLastWeekVal}
          />
        </Col>
        )}
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
