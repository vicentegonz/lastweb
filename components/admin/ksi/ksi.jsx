import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@/store/user/userReducer';
import {
  selectStoreServices, saveServices, clearStoreServiceData, calculateSumData,
} from '@/store/storeServices/storeServicesReducer';

import api from '@/api';

import {
  Row, Col, Divider, Space, Affix, Typography,
} from 'antd';

import DateSelector from '@/components/selectors/DateSelector.jsx';
import StoreSelector from '@/components/selectors/StoreSelector.jsx';

import styles from './ksi.module.scss';
import StoreServices from './StoreServices.jsx';

const { Title } = Typography;

const Ksi = () => {
  const user = useSelector(selectUser);
  const storeServices = useSelector(selectStoreServices);
  const dispatch = useDispatch();

  useEffect(() => {
    const storeServicesData = async () => {
      try {
        await user.stores.map(async (store) => {
          const response = await api.account.ksiData(store);
          const processedData = {};

          processedData.store = store;
          processedData.data = response.data.sort(
            (a, b) => new Date(b.date).toLocaleDateString()
            - new Date(a.date).toLocaleDateString(),
          );
          dispatch(saveServices(processedData));
        });
        return true;
      } catch (err) {
        return false;
      }
    };
    dispatch(clearStoreServiceData());
    storeServicesData();
  }, [dispatch, user.stores]);

  useEffect(() => {
    if (!storeServices.servicesData
      || Object.keys(storeServices.servicesData).length === 0
      || !user.selectedStore) {
      return;
    }
    dispatch(calculateSumData(user));
  }, [dispatch, user, storeServices.servicesData]);
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

      { Object.keys(storeServices.servicesData).length
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
        )}

    </div>
  );
};

export default Ksi;
