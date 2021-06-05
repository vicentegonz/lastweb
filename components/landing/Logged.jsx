import { useEffect } from 'react';
import PageLayout from '@/components/pageLayout/PageLayout.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@/store/user/userReducer';
import { selectStoreStats, save, clearStoreData } from '@/store/storeStats/storeStatsReducer';
import {
  Row, Col, Typography, Divider, Space,
} from 'antd';
import styles from '@/styles/landing.module.scss';
import StoreSelector from './StoreSelector.jsx';
import StoreStats from './Stats.jsx';
import StoreChart from './ChartContainer.jsx';

const { Title } = Typography;

const data = require('./storeData.json');

const LoggedLanding = () => {
  const user = useSelector(selectUser);
  const storeStats = useSelector(selectStoreStats);
  const dispatch = useDispatch();

  useEffect(() => {
    const storeStatsData = async () => {
      try {
        await user.stores.map(async (store) => {
          const response = {};
          response.store = store;
          response.data = data;
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
            <Title level={3} className={styles.bottomAligned}>
              <Space>
                Estadísticas recientes de la tienda
                {storeStats.selectedStore}
              </Space>
            </Title>
          </Col>
          <Col>
            <StoreSelector />
          </Col>
        </Row>
        <Divider />
        <Row justify="space-between" align="top">
          <Col span={13} className={styles.chartContainer}>
            <StoreChart />
          </Col>
          <Col span={10}>
            <StoreStats />
          </Col>
        </Row>
      </div>
    </PageLayout>
  );
};

export default LoggedLanding;
