import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectStoreServices } from '@/store/storeServices/storeServicesReducer';

import { Col } from 'antd';

import ReportCard from '@/components/admin/ksi/ReportsCard.jsx';

const KSIStats = () => {
  const storeServices = useSelector(selectStoreServices);
  const [cardData, setCardData] = useState();
  useEffect(() => {
    if (!storeServices.summaryKsi
      || Object.keys(storeServices.summaryKsi).length === 0
      || !storeServices.selectedStore) {
      return;
    }
    const finalData = storeServices.summaryKsi;
    let nanValue = true;
    Object.entries(finalData).forEach(([key, value]) => {
      if (!(['name', 'date'].includes(key))) {
        if (Number.isNaN(Number(value))) {
          nanValue = false;
        }
      }
    });
    if (nanValue) {
      setCardData(finalData);
    }
    setCardData(finalData);
  }, [storeServices]);

  return (
    <>
      {(cardData) && (
      <Col span={12}>
        <ReportCard
          name={cardData.name}
          value={parseFloat(cardData.value)}
          createdAt={cardData.date}
          differenceYesterdayPct={cardData.differenceYesterdayPct}
          differenceLastWeekPct={cardData.differenceLastWeekPct}
          differenceYesterdayVal={cardData.differenceYesterdayVal}
          differenceLastWeekVal={cardData.differenceLastWeekVal}
        />
      </Col>
      )}
    </>
  );
};

export default KSIStats;
