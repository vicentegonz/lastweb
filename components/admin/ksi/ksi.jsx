import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@/store/user/userReducer';
import {
  selectStoreServices, save, clearStoreData, changeDateRange,
} from '@/store/storeServices/storeServicesReducer';

import api from '@/api';

import {
  Row, Col, Divider, Space, Affix, Typography,
} from 'antd';

import styles from './ksi.module.scss';
import StoreSelector from './StoreSelector.jsx';
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

          dispatch(save(processedData));
        });
        return true;
      } catch (err) {
        return false;
      }
    };
    dispatch(clearStoreData());
    storeServicesData();
  }, [dispatch, user.stores]);

  useEffect(() => {
    if (!storeServices.servicesData
      || Object.keys(storeServices.servicesData).length === 0
      || !storeServices.selectedStore) {
      return;
    }
    const services = storeServices.servicesData[storeServices.selectedStore];
    if (services && services.length) {
      const finalDate = new Date(services[services.length - 1].date);
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
  }, [dispatch, storeServices.selectedStore, storeServices.servicesData]);

  return (
    <div>
      <Affix offsetTop={64}>

        <Row justify="space-between" align="bottom" className={styles.fixedRow}>
          <Col flex="auto">

            <Row>
              <Title level={3} className={styles.bottomAligned}>
                <Space>
                  Estadísticas de Servicio de la tienda
                  {storeServices.selectedStore}
                </Space>
              </Title>
            </Row>

            <Row>
              <Title level={4} className={styles.bottomAligned}>
                <Space>
                  Entre las fechas:
                  {storeServices.dateRange[0]}
                  -
                  {storeServices.dateRange[1]}
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

      { Object.keys(storeServices.servicesData).length
                && storeServices.servicesData[storeServices.selectedStore]
                && storeServices.servicesData[storeServices.selectedStore].length
        ? (
          <>
            <StoreServices />
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

export default Ksi;
