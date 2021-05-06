import {
  Row, Col, Avatar, Typography, Divider, Carousel,
} from 'antd';

import storeStyles from './Stores.module.scss';

const { Title } = Typography;

const AdminStore = () => (
  <div className={storeStyles.containerHorizontalMargin}>

    <Row justify="space-around">
      <Col span={2}>
        <Avatar className={storeStyles.orangeAvatar} size="large">
          Icono
        </Avatar>
      </Col>
      <Col span={20}>
        <Title level={3}>
          Tienda N°1
        </Title>
      </Col>
    </Row>

    <div>
      <Divider className={storeStyles.dividerA} />
    </div>

    <div>
      <Carousel>
        <div>
          <h3 className={storeStyles.carouselTemplate}>Detalle 1</h3>
        </div>
        <div>
          <h3 className={storeStyles.carouselTemplate}>Detalle 2</h3>
        </div>
        <div>
          <h3 className={storeStyles.carouselTemplate}>Detalle 3</h3>
        </div>
        <div>
          <h3 className={storeStyles.carouselTemplate}>Detalle 4</h3>
        </div>
      </Carousel>
    </div>

  </div>
);

export default AdminStore;
