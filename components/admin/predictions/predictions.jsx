import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@/store/user/userReducer';
import {
  selectStorePredictions,
  getProductDataFromApi,
  getPredictionDataFromApi,
  startLoading,
  endLoading,
  clearStoreProducts,
  clearStorePredictions,
  clearProduct,
} from '@/store/storePredictions/predictionsReducer';
import {
  Row, Col, Divider, Space, Affix, Typography, Input,
} from 'antd';

import StoreSelector from '@/components/selectors/StoreSelector.jsx';

import Loading from '@/components/global/Loading.jsx';
import PaginationFrame from './pagination.jsx';
import PredictionLineChart from './LineChart/PredictionLineChart.jsx';

import styles from './predictions.module.scss';

const { Title } = Typography;
const { Search } = Input;

const PredictionsFrame = () => {
  const user = useSelector(selectUser);
  const storePredictions = useSelector(selectStorePredictions);
  const [formattedProductData, setFormattedProductData] = useState([]);
  const [filteredText, setFilteredText] = useState('');
  const [chartData, setChartData] = useState(null);
  const [chartRange, setChartRange] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const storeProductsData = () => {
      if (!user.stores) {
        return;
      }
      user.stores.forEach((store) => {
        dispatch(getProductDataFromApi(store));
      });
    };
    dispatch(startLoading());
    dispatch(clearStoreProducts());
    storeProductsData();
  }, [dispatch, user.stores]);

  useEffect(() => {
    if (!storePredictions.storeProducts
      || Object.keys(storePredictions.storeProducts).length === 0) {
      return;
    }
    const storePredictionsData = () => {
      if (!user.stores) {
        return;
      }
      user.stores.map(async (store) => {
        if (storePredictions.storeProducts
          && Object.keys(storePredictions.storeProducts).length !== 0
          && storePredictions.storeProducts[store]) {
          if (storePredictions.storeProducts[store].length === 0) {
            dispatch(endLoading());
          } else {
            storePredictions.storeProducts[store].forEach((product) => {
              dispatch(getPredictionDataFromApi([store, product]));
            });
          }
        }
      });
    };
    dispatch(startLoading());
    dispatch(clearStorePredictions());
    storePredictionsData();
  }, [dispatch, user.stores, storePredictions.storeProducts]);

  useEffect(() => {
    if (!user.selectedStore
      || Object.keys(storePredictions.storeProducts).length === 0) {
      return;
    }

    const validPredictions = storePredictions.storePredictions[user.selectedStore]
      ? Object.keys(storePredictions.storePredictions[user.selectedStore]) : [];

    const validProducts = storePredictions.storeProducts[user.selectedStore] || [];

    const formattedArray = validProducts.filter((f) => validPredictions.includes(f.id.toString()));

    const filteredArray = formattedArray.filter(
      (f) => f.description.toLowerCase().includes(filteredText.toLowerCase())
    || filteredText === '',
    );
    setFormattedProductData(filteredArray);
  }, [storePredictions, user.selectedStore, filteredText]);

  const changeFilter = (event) => {
    setFilteredText(event.target.value);
  };

  useEffect(() => {
    if (!storePredictions.selectedProduct
      || !user.selectedStore
      || !storePredictions.storePredictions[user.selectedStore]
      || !storePredictions.storePredictions[user.selectedStore][storePredictions.selectedProduct]) {
      return;
    }
    const prediction = storePredictions
      .storePredictions[user.selectedStore][storePredictions.selectedProduct];

    const dataDict = {
      id: 'Unidades',
      data: [],
    };

    const rangeDict = {};

    prediction.mean.forEach((item, i) => {
      const data = {
        x: item.timestamp.split('T')[0],
        y: Math.round(item.value),
      };
      dataDict.data.push(data);

      const range = [Math.round(prediction.p10[i].value), Math.round(prediction.p90[i].value)];
      rangeDict[data.x] = range;
    });

    setChartData([dataDict]);
    setChartRange(rangeDict);
  }, [storePredictions.selectedProduct, user.selectedStore, storePredictions.storePredictions]);

  useEffect(() => {
    dispatch(clearProduct());
    setChartData(null);
    setChartRange(null);
  }, [user.selectedStore, dispatch]);

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
      {storePredictions.loading && <Loading />}
      <Row gutter={[32, 32]}>
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

            {storePredictions.loading && <Loading />}

            <Row className={styles.alertContainer}>
              { !storePredictions.loading && (formattedProductData.length ? (
                <PaginationFrame
                  itemArray={formattedProductData}
                />
              )
                : (
                  <Row justify="space-between" align="top">
                    <Title level={3}>
                      <Space>
                        {filteredText === '' && 'No hay productos con predicciones para esta tienda.'}
                        {filteredText !== '' && `No hay productos que contengan "${filteredText}"`}
                      </Space>
                    </Title>
                  </Row>
                ))}
            </Row>

          </Space>
        </Col>

        <Col span={16} className={styles.colContainer}>
          <Title className={styles.chartTitle} level={4}>
            {storePredictions.selectedProduct
              ? `Predicciones de venta de ${storePredictions.selectedProductName}`
              : 'Seleccione un producto'}
          </Title>
          {(chartData && chartRange)
            ? (<PredictionLineChart chartData={chartData} chartRange={chartRange} />) : null}
        </Col>

      </Row>

    </div>
  );
};

export default PredictionsFrame;
