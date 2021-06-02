import { useEffect } from 'react';
import PageLayout from '@/components/pageLayout/PageLayout.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@/store/user/userReducer';
import { selectStoreStats, save, clearStoreData } from '@/store/storeStats/storeStatsReducer';
import {
  Row, Col, Typography, Divider,
} from 'antd';

import styles from '@/styles/landing.module.scss';
import StoreSelector from './StoreSelector.jsx';

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
      <Row justify="center" align="top" className={styles.rowCentered}>
        <Col>
          <Title level={2}>
            Bienvenido,
            {' '}
            {user.givenName}
          </Title>
        </Col>
      </Row>
      <Row justify="center" align="top">
        <Col flex={1} offset={1}>
          <StoreSelector />
        </Col>
        <Col flex={6} />
      </Row>
      <Divider />
      <Row justify="center" align="top">
        <Col flex={2} offset={1}>
          Tarjetas para tienda:
          {' '}
          {storeStats.selectedStore}
        </Col>
        <Divider type="vertical" />
        <Col flex={3}>
          Gráfico para tienda:
          {' '}
          {storeStats.selectedStore}
        </Col>
      </Row>
    </PageLayout>
  );
};

export default LoggedLanding;
