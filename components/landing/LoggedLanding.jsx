import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@/store/user/userReducer';
import {
  selectStoreStats, getKPIDataFromApi, clearStoreStatsData, startLoadingKPI,
} from '@/store/storeStats/storeStatsReducer';
import {
  selectStoreServices, getDataFromApi, clearStoreServiceData, startLoadingKSI,
} from '@/store/storeServices/storeServicesReducer';
import {
  Row, Col, Typography, Divider, Space, Affix,
} from 'antd';
import StoreSelector from '@/components/selectors/StoreSelector.jsx';
import DateSelector from '@/components/selectors/DateSelector.jsx';
import Loading from '@/components/global/Loading.jsx';
import styles from './landing.module.scss';
import KPIStats from './stats/StoreKPIStats.jsx';
import KSIStats from './stats/StoreKSIStats.jsx';

const { Title } = Typography;

const LoggedLanding = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);
  const storeServices = useSelector(selectStoreServices);
  const storeStats = useSelector(selectStoreStats);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const storeData = () => {
      user.stores.forEach((store) => {
        dispatch(getDataFromApi([store, user.dateRange[0], user.dateRange[1]]));
        dispatch(getKPIDataFromApi([store, user.dateRange[0], user.dateRange[1]]));
      });
    };
    dispatch(startLoadingKPI());
    dispatch(startLoadingKSI());
    dispatch(clearStoreServiceData());
    dispatch(clearStoreStatsData());
    storeData();

    setLoading(false);
  }, [dispatch, user.stores, user.dateRange]);

  useEffect(() => {
    setLoading(true);
    if (!storeStats.loading && !storeServices.loading) {
      setLoading(false);
    }
  }, [storeStats.loading, storeServices.loading]);

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
                  {user.selectedStore}
                </Space>
              </Title>
            </Row>

            <Row>
              <Title level={4} className={styles.bottomAligned}>
                <Space>
                  Para el día
                  {user.dateRange[1].replace(/-/g, '/')}
                </Space>
              </Title>
            </Row>

          </Col>
          <Col>
            <Space>
              <DateSelector />
              <StoreSelector />
            </Space>
          </Col>
        </Row>

      </Affix>

      <Divider />
      {loading && <Loading />}
      { !loading && (Object.keys(storeServices.servicesData).length
            && storeServices.servicesData[user.selectedStore]
            && storeServices.servicesData[user.selectedStore].length
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
        ))}

    </div>
  );
};

export default LoggedLanding;
