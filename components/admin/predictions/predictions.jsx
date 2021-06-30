import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@/store/user/userReducer';
import {
  selectStorePredictions,
  saveProducts, savePredictions,
} from '@/store/storePredictions/predictionsReducer';
import api from '@/api';
import {
  Row, Col, Divider, Space, Typography,
} from 'antd';

import PaginationFrame from './pagination.jsx';
// import PredictionCard from './predictionsCard.jsx';

import styles from './predictions.module.scss';

const { Title } = Typography;

const listaItems = [];
for (let i = 0; i < 61; i += 1) {
  listaItems.push(i);
}

const PredictionsFrame = () => {
  const user = useSelector(selectUser);
  const storePredictions = useSelector(selectStorePredictions);
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
          // This has to be changed when backend fixes automation
          const lastWeek = new Date();
          lastWeek.setDate(lastWeek.getDate() - 7);
          const offset = lastWeek.getTimezoneOffset();
          const offsetWeek = new Date(lastWeek.getTime() - (offset * 60 * 1000));
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

          return true;
        });
        return true;
      } catch (err) {
        return false;
      }
    };
    storePredictionsData();
  }, [dispatch, user.stores, storePredictions.storeProducts]);

  return (
    <div>
      <Row justify="space-between" align="bottom" className={styles.fixedRow}>
        <Col flex="auto">

          <Row>
            <Title level={3} className={styles.bottomAligned}>
              <Space>
                Predicciones de ventas
              </Space>
            </Title>
          </Row>
        </Col>
      </Row>

      <Divider />

      <PaginationFrame
        itemArray={listaItems}
      />
    </div>
  );
};
export default PredictionsFrame;
