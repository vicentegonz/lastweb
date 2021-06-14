import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@/store/user/userReducer';
import {
  selectStoreStats, save, clearStoreData, changeDateRange,
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
          const response = await api.account.kpiData(store);
          const processedData = {};

          processedData.store = store;
          processedData.data = response.data.sort(
            (a, b) => new Date(b.date).toLocaleDateString()
            - new Date(a.date).toLocaleDateString(),
          );

          dispatch(save(processedData));
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
    if (stats && stats.length) {
      const finalDate = new Date(stats[stats.length - 1].date);
      const initialDate = new Date(finalDate);
      initialDate.setDate(initialDate.getDate() - 7);

      dispatch(
        changeDateRange([initialDate.toLocaleDateString('en-ZA'), finalDate.toLocaleDateString('en-ZA')]),
      );
    } else {
      dispatch(
        changeDateRange([null, null]),
      );
    }
  }, [dispatch, storeStats.selectedStore, storeStats.statsData]);

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
                  {storeStats.dateRange[0]}
                  -
                  {storeStats.dateRange[1]}
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
