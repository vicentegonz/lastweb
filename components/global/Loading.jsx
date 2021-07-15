import {
  Row, Col, Typography, Spin,
} from 'antd';

const { Title } = Typography;

const Loading = () => (
  <Row justify="center" align="middle" gutter={24}>
    <Col>
      <Title level={3}>Cargando...</Title>
    </Col>
    <Col>
      <Spin />
    </Col>
  </Row>
);

export default Loading;
