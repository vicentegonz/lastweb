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
      <Row justify="start" align="top">
        <Col offset={1}>
          <Title level={2} className={styles.bottomAligned}>
            <Space>
              Bienvenido,
              {user.givenName}
            </Space>
          </Title>
        </Col>
      </Row>
      <Row justify="start" align="bottom">
        <Col span={18} offset={1}>
          <Title level={3} className={styles.bottomAligned}>
            <Space>
              Estadísticas recientes de la tienda
              {storeStats.selectedStore}
            </Space>
          </Title>
        </Col>
        <Col span={4} offset={1}>
          <StoreSelector />
        </Col>
      </Row>
      <Divider />
      <Row justify="start" align="top">
        <Col span={9} offset={1}>
          <StoreStats />
        </Col>
        <Divider type="vertical" />
        <Col span={13}>
          <Space>
            Gráfico para tienda:
            {storeStats.selectedStore}
          </Space>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default LoggedLanding;
