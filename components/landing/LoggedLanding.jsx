import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@/store/user/userReducer';
// import {
//   selectStoreStats, calculateStatSumData,
// } from '@/store/storeStats/storeStatsReducer';
import {
  selectStoreServices, getDataFromApi, clearStoreServiceData,
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
  // const storeStats = useSelector(selectStoreStats);
  const storeServices = useSelector(selectStoreServices);
  const dispatch = useDispatch();

  // KPI request: needs to be refactored
  // useEffect(() => {
  //   const storeStatsData = async () => {
  //     try {
  //       await user.stores.map(async (store) => {
  //         const processedData = {};

  //         processedData.store = store;
  //         processedData.data = [];

  //         const requestParams = {
  //           id: store,
  //           start_date: user.dateRange[0],
  //           end_date: user.dateRange[1],
  //           size: 15,
  //           page: 1,
  //         };

  //         let response;
  //         const allRequested = true;

  //         // while (allRequested) {
  //         // eslint-disable-next-line no-await-in-loop
  //         // response = await api.account.kpiData(requestParams);
  //         // processedData.data.push(...response.data.results);

  //         // requestParams.page += 1;
  //         // allRequested = response.data.links.next;
  //         // }
  //         // processedData.data.reverse();
  //         // dispatch(save(processedData));
  //       });
  //       return true;
  //     } catch (err) {
  //       return false;
  //     }
  //   };
  //   dispatch(clearStoreData());
  //   storeStatsData();
  // }, [dispatch, user.stores, user.dateRange]);

  useEffect(() => {
    setLoading(true);
    const storeServicesData = () => {
      user.stores.forEach((store) => {
        dispatch(getDataFromApi([store, user.dateRange[0], user.dateRange[1]]));
      });
    };
    dispatch(clearStoreServiceData());
    storeServicesData();

    setLoading(false);
  }, [dispatch, user.stores, user.dateRange]);

  useEffect(() => {
    setLoading(true);
    if (!storeServices.servicesData
      || Object.keys(storeServices.servicesData).length === 0
      || !user.selectedStore) {
      return;
    }
    setLoading(false);
  }, [dispatch, user, storeServices.servicesData]);

  // useEffect(() => {
  //   setLoading(true);
  //   if (!storeStats.statsData
  //     || Object.keys(storeStats.statsData).length === 0
  //     || !user.selectedStore) {
  //     setLoading(false);
  //     return;
  //   }
  //   dispatch(calculateStatSumData(user));
  //   setLoading(false);
  // }, [dispatch, user, storeStats.statsData]);

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
