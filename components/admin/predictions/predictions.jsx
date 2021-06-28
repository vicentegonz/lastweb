import {
  Row, Col, Divider, Space, Typography,
} from 'antd';
import styles from './predictions.module.scss';

const { Title } = Typography;

const PredictionsFrame = () => (
  <div>

    <Row justify="space-between" align="bottom" className={styles.fixedRow}>
      <Col flex="auto">

        <Row>
          <Title level={3} className={styles.bottomAligned}>
            <Space>
              Predicciones
            </Space>
          </Title>
        </Row>
      </Col>
    </Row>

    <Divider />

    <div>
      Predicciones.
    </div>
  </div>
);

export default PredictionsFrame;
