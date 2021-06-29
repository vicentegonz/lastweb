import {
  Row, Col, Divider, Space, Typography,
} from 'antd';
import PredictionCard from './predictionsCard.jsx';

import styles from './predictions.module.scss';

const { Title } = Typography;

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

    <div>
      <PredictionCard
        productId="123"
        description="PORCION PAPAS FRITAS V2"
        date="YYYY/MM/DD"
        prediction={[100, 200]}
        days={3}
      />
    </div>
  </div>
);

export default PredictionsFrame;
