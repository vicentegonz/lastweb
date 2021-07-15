import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectStoreServices } from '@/store/storeServices/storeServicesReducer';
import { selectUser } from '@/store/user/userReducer';
import { Col } from 'antd';
import ReportCard from '@/components/admin/ksi/ReportsCard.jsx';

const KSIStats = () => {
  const storeServices = useSelector(selectStoreServices);
  const user = useSelector(selectUser);
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
  }, [storeServices, user.selectedStore]);

  return (
    <>
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
    </>
  );
};

export default KSIStats;
