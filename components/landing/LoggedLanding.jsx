import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@/store/user/userReducer';
import {
  selectStoreStats, save, clearStoreData,
} from '@/store/storeStats/storeStatsReducer';
import {
  Row, Col, Typography, Divider, Space, Affix,
} from 'antd';
import api from '@/api';
import styles from './landing.module.scss';
import StoreSelector from './StoreSelector.jsx';
import KPIStats from './stats/StoreKPIStats.jsx';
import KSIStats from './stats/StoreKSIStats.jsx';

const { Title } = Typography;

const LoggedLanding = () => {
  const user = useSelector(selectUser);
  const storeStats = useSelector(selectStoreStats);
  const dispatch = useDispatch();

  useEffect(() => {
    const storeStatsData = async () => {
      try {
        await user.stores.map(async (store) => {
          const processedData = {};

          processedData.store = store;
          processedData.data = [];

          const requestParams = {
            id: store,
            start_date: storeStats.dateRange[0],
            end_date: storeStats.dateRange[1],
            size: 15,
            page: 1,
          };

          let response;
          let allRequested = true;

          while (allRequested) {
            // eslint-disable-next-line no-await-in-loop
            response = await api.account.kpiData(requestParams);
            processedData.data.push(...response.data.results);

            requestParams.page += 1;
            allRequested = response.data.links.next;
          }

          processedData.data.reverse();
          dispatch(save(processedData));
        });
        return true;
      } catch (err) {
        return false;
      }
    };
    dispatch(clearStoreData());
    storeStatsData();
  }, [dispatch, user.stores, storeStats.dateRange]);

  return (
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

      <Affix offsetTop={64}>

        <Row justify="space-between" align="bottom" className={styles.fixedRow}>
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
                  {storeStats.dateRange[0].replace(/-/g, '/')}
                  -
                  {storeStats.dateRange[1].replace(/-/g, '/')}
                </Space>
              </Title>
            </Row>

          </Col>
          <Col>
            <StoreSelector />
          </Col>
        </Row>

      </Affix>

      <Divider />

      { Object.keys(storeStats.statsData).length
            && storeStats.statsData[storeStats.selectedStore]
            && storeStats.statsData[storeStats.selectedStore].length
        ? (
          <>
            <div className={styles.paddedDiv}>
              <Title level={3}>
                Indicadores de desempeño:
              </Title>
              <Row justify="space-between" align="top">
                <KPIStats />
              </Row>
            </div>
            <div className={styles.paddedDiv}>
              <Title level={3}>
                Indicadores de servicio:
              </Title>
              <Row justify="space-around" align="top">
                <KSIStats />
              </Row>
            </div>
          </>
        )
        : (
          <Row justify="space-between" align="top">
            <Title level={3}>
              <Space>
                No hay estadísticas para esta tienda.
              </Space>
            </Title>
          </Row>
        )}

    </div>
  );
};

export default LoggedLanding;
