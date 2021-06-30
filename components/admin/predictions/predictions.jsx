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

const PredictionsFrame = () => (
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

export default PredictionsFrame;
