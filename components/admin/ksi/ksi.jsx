import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@/store/user/userReducer';
import {
  selectStoreServices, getDataFromApi, clearStoreServiceData, startLoadingKSI,
} from '@/store/storeServices/storeServicesReducer';

import {
  Row, Col, Divider, Space, Affix, Typography,
} from 'antd';

import DateSelector from '@/components/selectors/DateSelector.jsx';
import StoreSelector from '@/components/selectors/StoreSelector.jsx';
import Loading from '@/components/global/Loading.jsx';

import styles from './ksi.module.scss';
import StoreServices from './StoreServices.jsx';

const { Title } = Typography;

const Ksi = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);
  const storeServices = useSelector(selectStoreServices);
  const dispatch = useDispatch();

  useEffect(() => {
    const storeServicesData = () => {
      user.stores.forEach((store) => {
        dispatch(getDataFromApi([store, user.dateRange[0], user.dateRange[1]]));
      });
    };
    dispatch(startLoadingKSI());
    dispatch(clearStoreServiceData());
    storeServicesData();
  }, [dispatch, user.stores, user.dateRange]);

  useEffect(() => {
    setLoading(true);
    if (!storeServices.loading) {
      setLoading(false);
    }
  }, [storeServices.loading]);

  return (
    <div>
      <Affix offsetTop={64}>

        <Row justify="space-between" align="bottom" className={styles.fixedRow}>
          <Col flex="auto">

            <Row>
              <Title level={3} className={styles.bottomAligned}>
                <Space>
                  Estadísticas de Servicio de la tienda
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
          <StoreServices />
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

export default Ksi;
