import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@/store/user/userReducer';
import {
  selectStoreStats, getKPIDataFromApi, clearStoreStatsData, startLoadingKPI,
} from '@/store/storeStats/storeStatsReducer';
import {
  Row, Col, Typography, Divider, Space, Affix,
} from 'antd';
import StoreSelector from '@/components/selectors/StoreSelector.jsx';
import DateSelector from '@/components/selectors/DateSelector.jsx';
import KPISelector from '@/components/selectors/KPISelector.jsx';
import CategorySelector from '@/components/selectors/CategorySelector.jsx';
import Loading from '@/components/global/Loading.jsx';
import styles from './kpi.module.scss';
import StoreStats from './stats/StoreStats.jsx';
import StoreChart from './chart/StoreChart.jsx';

const { Title } = Typography;

const KpiFrame = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);
  const storeStats = useSelector(selectStoreStats);
  const dispatch = useDispatch();

  useEffect(() => {
    const storeStatsData = () => {
      user.stores.forEach((store) => {
        dispatch(getKPIDataFromApi([store, user.dateRange[0], user.dateRange[1]]));
      });
    };
    dispatch(startLoadingKPI());
    dispatch(clearStoreStatsData());
    storeStatsData();
  }, [dispatch, user.stores, user.dateRange]);

  useEffect(() => {
    setLoading(true);
    if (!storeStats.loading) {
      setLoading(false);
    }
  }, [storeStats.loading]);

  return (
    <div>
      <Affix offsetTop={64}>

        <Row justify="space-between" align="bottom" className={styles.fixedRow} gutter={[0, 24]}>
          <Col flex="auto">

            <Row>
              <Title level={3} className={styles.bottomAligned}>
                <Space>
                  Estadísticas recientes de la tienda
                  {user.selectedStore}
                </Space>
              </Title>
            </Row>

            <Row>
              <Title level={4} className={styles.bottomAligned}>
                <Space>
                  Entre las fechas:
                  {user.dateRange[0].replace(/-/g, '/')}
                  -
                  {user.dateRange[1].replace(/-/g, '/')}
                </Space>
              </Title>
            </Row>

          </Col>

          <Col>
            <Space>
              <DateSelector />
              <StoreSelector />
              <KPISelector />
              <CategorySelector />
            </Space>
          </Col>
        </Row>

      </Affix>

      <Divider />
      {loading && <Loading />}

      <Row justify="space-between" align="top">
        { !loading && user.selectedStore
            && (Object.keys(storeStats.statsData).length
            && storeStats.statsData[user.selectedStore]
            && Object.keys(storeStats.statsData[user.selectedStore]).length
              ? (
                <>
                  <Col span={13} className={styles.chartContainer}>
                    <StoreChart />
                  </Col>
                  <Col span={10}>
                    <StoreStats />
                  </Col>
                </>
              )
              : (
                <Title level={3}>
                  <Space>
                    No hay estadísticas para esta tienda.
                  </Space>
                </Title>
              ))}

      </Row>

    </div>
  );
};

export default KpiFrame;
