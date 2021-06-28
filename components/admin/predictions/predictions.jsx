import {
  Row, Col, Divider, Space, Typography,
} from 'antd';
import PaginationFrame from '@/components/admin/predictions/pagination.jsx';
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

    <PaginationFrame />
    <Divider />
  </div>
);

export default PredictionsFrame;
