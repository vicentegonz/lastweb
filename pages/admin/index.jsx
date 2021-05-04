import Head from 'next/head';
import React from 'react';
import {
  Row, Col, Avatar, Button,
} from 'antd';
import Layout, { siteTitle } from '@/components/layout/Layout.jsx';

export default function Home() {
  return (
    <>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
      </Layout>

      <>
        <Row justify="center">
          <Col span={4}>
            <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="large">
              Icono
            </Avatar>
          </Col>
          <Col span={12}>
            <Button type="primary">Tienda N°1</Button>
          </Col>
        </Row>
      </>

    </>
  );
}
