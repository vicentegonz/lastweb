import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectStoreServices } from '@/store/storeServices/storeServicesReducer';
import { selectUser } from '@/store/user/userReducer';

import { Row, Col } from 'antd';

import styles from './ksi.module.scss';
import ReportCard from './ReportsCard.jsx';

const StoreServices = () => {
  const storeServices = useSelector(selectStoreServices);
  const user = useSelector(selectUser);
  const [cardData, setCardData] = useState([]);
  const [summaryCardData, setSummaryCardData] = useState();
  const [npsCardData, setNpsCardData] = useState();

  useEffect(() => {
    if (!storeServices.summaryKsi
      || Object.keys(storeServices.summaryKsi).length === 0
      || !user.selectedStore) {
      return;
    }
    setSummaryCardData(storeServices.summaryKsi[user.selectedStore]);

    if (!storeServices.npsKsi
      || Object.keys(storeServices.npsKsi).length === 0
      || !user.selectedStore) {
      return;
    }
    setNpsCardData(storeServices.npsKsi[user.selectedStore]);

    if (!storeServices.servicesData
      || Object.keys(storeServices.servicesData).length === 0
      || !user.selectedStore) {
      return;
    }
    setCardData(storeServices.servicesData[user.selectedStore]);
  }, [storeServices, user.selectedStore]);

  return (
    <>
      <Row justify="space-around" align="top">
        {(summaryCardData) && (
        <Col span={10}>
          <ReportCard
            name={summaryCardData.name}
            value={parseFloat(summaryCardData.value)}
            createdAt={user.dateRange[1]}
            differenceYesterdayPct={summaryCardData.variationYpercentage}
            differenceLastWeekPct={summaryCardData.variationLWpercentage}
            differenceYesterdayVal={summaryCardData.variationYNumber}
            differenceLastWeekVal={summaryCardData.variationLWNumber}
          />
        </Col>
        )}
        {(npsCardData) && (
        <Col span={10}>
          <ReportCard
            name={npsCardData.name}
            value={parseFloat(npsCardData.value)}
            createdAt={user.dateRange[1]}
            differenceYesterdayPct={npsCardData.variationYpercentage}
            differenceLastWeekPct={npsCardData.variationLWpercentage}
            differenceYesterdayVal={npsCardData.variationYNumber}
            differenceLastWeekVal={npsCardData.variationLWNumber}
          />
        </Col>
        )}
      </Row>
      <Row justify="space-around" align="top">
        {
          cardData.map((item) => (
            <Col span={10} className={styles.servicesCard} key={item.id}>
              <ReportCard
                key={item.id}
                name={item.name}
                value={parseFloat(item.value)}
                createdAt={user.dateRange[1]}
                differenceYesterdayPct={item.variationYpercentage}
                differenceLastWeekPct={item.variationLWpercentage}
                differenceYesterdayVal={item.variationYNumber}
                differenceLastWeekVal={item.variationLWNumber}
              />
            </Col>
          ))
        }
      </Row>
    </>
  );
};

export default StoreServices;
