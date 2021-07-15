import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@/store/user/userReducer';
import {
  selectStorePredictions,
  saveProducts, savePredictions,
} from '@/store/storePredictions/predictionsReducer';
import api from '@/api';
import {
  Row, Col, Divider, Space, Affix, Typography, Input,
} from 'antd';

import StoreSelector from '@/components/selectors/StoreSelector.jsx';

import Loading from '@/components/global/Loading.jsx';
import PaginationFrame from './pagination.jsx';

import styles from './predictions.module.scss';

const { Title } = Typography;
const { Search } = Input;

// const getDateRangeSum = (datearray, days) => {
//   const relevantDays = datearray.slice(1, days + 1);
//   const dataSum = relevantDays.reduce((a, b) => a + b.value, 0);
//   return Math.round(dataSum);
// };

const PredictionsFrame = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);
  const storePredictions = useSelector(selectStorePredictions);
  const [formattedProductData, setFormattedProductData] = useState([]);
  const [filteredText, setFilteredText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const storeProductsData = async () => {
      try {
        await user.stores.map(async (store) => {
          const processedData = {};

          processedData.store = store;
          processedData.data = [];

          const requestParams = {
            id: store,
            page: 1,
          };

          let response;
          let allRequested = true;

          while (allRequested) {
            // eslint-disable-next-line no-await-in-loop
            response = await api.account.productData(requestParams);
            processedData.data.push(...response.data.results);

            requestParams.page += 1;
            allRequested = response.data.links.next;
          }

          dispatch(saveProducts(processedData));
          return true;
        });
        return true;
      } catch (err) {
        return false;
      }
    };
    storeProductsData();
  }, [dispatch, user.stores]);

  useEffect(() => {
    if (!storePredictions.storeProducts
      || Object.keys(storePredictions.storeProducts).length === 0) {
      return;
    }
    const storePredictionsData = async () => {
      try {
        await user.stores.map(async (store) => {
          const today = new Date();
          const offset = today.getTimezoneOffset();
          const offsetWeek = new Date(today.getTime() - (offset * 60 * 1000));
          const parsedLastWeek = offsetWeek.toISOString().split('T')[0];

          let result;

          if (storePredictions.storeProducts
            && Object.keys(storePredictions.storeProducts).length !== 0
            && storePredictions.storeProducts[store]
            && storePredictions.storeProducts[store].length !== 0) {
            await storePredictions.storeProducts[store].map(async (product) => {
              const processedData = {};
              processedData.store = store;
              processedData.product = product.id;
              processedData.data = [];
              const requestParams = {
                product: product.id,
                store,
                date: parsedLastWeek,
              };
              try {
                result = await api.account.predictionData(requestParams);
                processedData.data.push(result.data);
                dispatch(savePredictions(processedData));
                return true;
              } catch (error) {
                return false;
              }
            });
          }
        });
        return true;
      } catch (err) {
        return false;
      }
    };

    setLoading(true);
    storePredictionsData();
    setLoading(false);
  }, [dispatch, user.stores, storePredictions.storeProducts]);

  useEffect(() => {
    setLoading(true);
    if (!user.selectedStore
      || Object.keys(storePredictions.storeProducts).length === 0) {
      return;
    }

    const formattedArray = storePredictions.storeProducts[user.selectedStore] || [];
    const filteredArray = formattedArray.filter(
      (f) => f.description.toLowerCase().includes(filteredText.toLowerCase())
    || filteredText === '',
    );
    setFormattedProductData(filteredArray);

    setLoading(false);
  }, [storePredictions, user.selectedStore, filteredText]);
  const changeFilter = (event) => {
    setFilteredText(event.target.value);
  };

  return (
    <div>
      <Affix offsetTop={64}>
        <Row justify="space-between" align="bottom" className={styles.fixedRow}>

          <Col flex="auto">
            <Row>
              <Title level={3} className={styles.bottomAligned}>
                <Space>
                  Predicciones de ventas de la tienda
                  {user.selectedStore}
                </Space>
              </Title>
            </Row>

            <Row>
              <Title level={4} className={styles.bottomAligned}>
                <Space>
                  Desde el día
                  {storePredictions.date[0].replace(/-/g, '/')}
                </Space>
              </Title>
            </Row>
          </Col>

          <Col>
            <Space size="middle">
              <StoreSelector />
            </Space>
          </Col>

        </Row>
      </Affix>
      <Divider />
      {loading && <Loading />}
      <Row gutter={32}>
        <Col span={8}>
          <Space direction="vertical" size="small" className={styles.fatherWidth}>
            <Row>
              <Title level={4} className={styles.bottomAligned}>
                <Space>
                  Seleccionar un Producto:
                </Space>
              </Title>
            </Row>
            <Row>
              <Search
                placeholder="Buscar Producto"
                onChange={changeFilter}
                enterButton
              />
            </Row>

            {loading && <Loading />}

            <Row className={styles.notificationContainer}>
              { !loading && (formattedProductData.length ? (
                <PaginationFrame
                  itemArray={formattedProductData}
                />
              )
                : (
                  <Row justify="space-between" align="top">
                    <Title level={3}>
                      <Space>
                        {filteredText === '' && 'No hay predicciones para esta tienda.'}
                        {filteredText !== '' && `No hay productos que contengan "${filteredText}"`}
                      </Space>
                    </Title>
                  </Row>
                ))}
            </Row>

          </Space>
        </Col>

        <Col span={16} className={styles.colContainer} />

      </Row>

    </div>
  );
};

export default PredictionsFrame;
