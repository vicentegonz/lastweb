import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@/store/user/userReducer';
import {
  selectStorePredictions,
  saveProducts, savePredictions,
} from '@/store/storePredictions/predictionsReducer';
import api from '@/api';
import {
  Row, Col, Divider, Space, Affix, Typography,
} from 'antd';

import StoreSelector from '@/components/selectors/StoreSelector.jsx';
import PaginationFrame from './pagination.jsx';

import styles from './predictions.module.scss';

const { Title } = Typography;

const getDateRangeSum = (datearray, days) => {
  const relevantDays = datearray.slice(0, days + 1);
  const dataSum = relevantDays.reduce((a, b) => a + b.value, 0);
  return Math.round(dataSum);
};

const PredictionsFrame = () => {
  const user = useSelector(selectUser);
  const storePredictions = useSelector(selectStorePredictions);
  const [formattedPredictionData, setFormattedPredictionData] = useState([]);
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
    storePredictionsData();
  }, [dispatch, user.stores, storePredictions.storeProducts]);

  useEffect(() => {
    if (!user.selectedStore
      || Object.keys(storePredictions.storeProducts).length === 0
      || Object.keys(storePredictions.storePredictions).length === 0) {
      return;
    }

    const formattedArray = [];
    storePredictions.storeProducts[user.selectedStore].forEach((item) => {
      if (storePredictions.storePredictions[user.selectedStore]
        && storePredictions.storePredictions[user.selectedStore][item.id]) {
        const productData = {
          id: item.id,
          description: item.description,
          initialDate: storePredictions.date[0],
          days: storePredictions.days,
          min: getDateRangeSum(
            storePredictions.storePredictions[user.selectedStore][item.id].p10,
            storePredictions.days,
          ),
          max: getDateRangeSum(
            storePredictions.storePredictions[user.selectedStore][item.id].p90,
            storePredictions.days,
          ),
        };

        formattedArray.push(productData);
      }
    });

    setFormattedPredictionData(formattedArray);
  }, [storePredictions, user.selectedStore]);

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
          </Col>

          <Col>
            <Space>
              <StoreSelector />
            </Space>
          </Col>

        </Row>
      </Affix>
      <Divider />
      { formattedPredictionData.length ? (
        <PaginationFrame
          itemArray={formattedPredictionData}
        />
      )
        : (
          <Row justify="space-between" align="top">
            <Title level={3}>
              <Space>
                No hay predicciones para esta tienda.
              </Space>
            </Title>
          </Row>
        )}

    </div>
  );
};

export default PredictionsFrame;
