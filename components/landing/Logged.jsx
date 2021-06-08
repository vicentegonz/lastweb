import { useEffect, useState } from 'react';
import PageLayout from '@/components/pageLayout/PageLayout.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@/store/user/userReducer';
import { selectStoreStats, save, clearStoreData } from '@/store/storeStats/storeStatsReducer';
import {
  Row, Col, Typography, Divider, Space,
} from 'antd';
import styles from '@/styles/landing.module.scss';
import StoreSelector from './StoreSelector.jsx';
import StoreStats from './StatsContainer.jsx';
import StoreChart from './ChartContainer.jsx';

const { Title } = Typography;

const data = require('./storeData.json');

const LoggedLanding = () => {
  const user = useSelector(selectUser);
  const storeStats = useSelector(selectStoreStats);
  const [dateRange, setDateRange] = useState([null, null]);
  const dispatch = useDispatch();

  useEffect(() => {
    const storeStatsData = async () => {
      try {
        await user.stores.map(async (store) => {
          const response = {};
          response.store = store;
          response.data = data.slice().sort(
            (a, b) => new Date(b.created_at * 1000).toLocaleDateString()
            - new Date(a.created_at * 1000).toLocaleDateString(),
          );
          dispatch(save(response));
        });
        return true;
      } catch (err) {
        return false;
      }
    };
    dispatch(clearStoreData());
    storeStatsData();
  }, [dispatch, user.stores]);

  useEffect(() => {
    if (!storeStats.statsData
      || Object.keys(storeStats.statsData).length === 0
      || !storeStats.selectedStore) {
      return;
    }
    const stats = storeStats.statsData[storeStats.selectedStore];
    const initialDate = new Date(stats[0].created_at * 1000).toLocaleDateString();
    const finalDate = new Date(stats[stats.length - 1].created_at * 1000).toLocaleDateString();
    setDateRange([initialDate, finalDate]);
  }, [storeStats.selectedStore, storeStats.statsData]);

  return (
    <PageLayout>
      <div>

        <Row justify="start" align="top">
          <Col>
            <Title level={2} className={styles.bottomAligned}>
              <Space>
                Bienvenido,
                {user.givenName}
              </Space>
            </Title>
          </Col>
        </Row>

        <Row justify="space-between" align="bottom">
          <Col flex="auto">

            <Row>
              <Title level={3} className={styles.bottomAligned}>
                <Space>
                  Estadísticas recientes de la tienda
                  {storeStats.selectedStore}
                </Space>
              </Title>
            </Row>

            <Row>
              <Title level={4} className={styles.bottomAligned}>
                <Space>
                  Entre las fechas:
                  {dateRange[0]}
                  -
                  {dateRange[1]}
                </Space>
              </Title>
            </Row>

          </Col>
          <Col>
            <StoreSelector />
          </Col>
        </Row>

        <Divider />

        <Row justify="space-between" align="top">
          <Col span={15} className={styles.chartContainer}>
            <StoreChart />
          </Col>
          <Col span={8}>
            <StoreStats />
          </Col>
        </Row>

      </div>
    </PageLayout>
  );
};

export default LoggedLanding;
