import Head from 'next/head';
import { siteTitle } from '@/components/layout/Layout.jsx';

import 'antd/dist/antd.css';
import {
  Row, Col, Avatar, Typography, Divider, Carousel,
} from 'antd';

import utilStyles from '@/styles/utils.module.scss';
import storeStyles from './Stores.module.scss';

const { Title } = Typography;

const AdminStore = () => (
  <div>
    <Head>
      <title>{siteTitle}</title>
    </Head>

    <header className={storeStyles.header}>
      <h1 className={utilStyles.heading2Xl}>Arcoprime</h1>
    </header>

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

  </div>
);

export default AdminStore;
