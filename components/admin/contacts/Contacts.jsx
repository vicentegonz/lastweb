import Head from 'next/head';
import { siteTitle } from '@/components/layout/Layout.jsx';

import {
  Row, Col, Avatar, Typography, Divider, Tabs, Input, Menu, Space, Button, Upload, Comment,
} from 'antd';

import utilStyles from '@/styles/utils.module.scss';
import contactsStyles from './Contacts.module.scss';

const { Title } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;

const AdminContacts = () => (
  <div>
    <Head>
      <title>{siteTitle}</title>
    </Head>

    <header className={contactsStyles.header}>
      <h1 className={utilStyles.heading2Xl}>Arcoprime</h1>
    </header>

    <div className={contactsStyles.containerHorizontalMargin}>

      <Row justify="space-around">

        <Col span={20}>
          <Title level={2}>
            Contactos
          </Title>
        </Col>
      </Row>

      <div>
        <Divider className={contactsStyles.dividerA} />
      </div>

      <Row gutter={32}>
        <Col span={8}>
          <Space direction="vertical" size="small" className={contactsStyles.fatherWidth}>
            <Row>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Todos" key="1" />
                <TabPane tab="Favoritos" key="2" />
                <TabPane tab="Jefes de Zona" key="3" />
                <TabPane tab="Jefes de Tienda" key="4" />
              </Tabs>
            </Row>

            <Row>
              <Search placeholder="Buscar contactos" enterButton />
            </Row>

            <Row>
              <Menu mode="inline">

                <Menu.Item key="1">
                  <Space>
                    <Avatar className={contactsStyles.orangeAvatar} size="medium">
                      Foto
                    </Avatar>
                    Contacto 1
                  </Space>
                </Menu.Item>

                <Menu.Item key="2">
                  <Space>
                    <Avatar className={contactsStyles.orangeAvatar} size="medium">
                      Foto
                    </Avatar>
                    Contacto 2
                  </Space>
                </Menu.Item>

                <Menu.Item key="3">
                  <Space>
                    <Avatar className={contactsStyles.orangeAvatar} size="medium">
                      Foto
                    </Avatar>
                    Contacto 3
                  </Space>
                </Menu.Item>

                <Menu.Item key="4">
                  <Space>
                    <Avatar className={contactsStyles.orangeAvatar} size="medium">
                      Foto
                    </Avatar>
                    Contacto 4
                  </Space>
                </Menu.Item>

                <Menu.Item key="5">
                  <Space>
                    <Avatar className={contactsStyles.orangeAvatar} size="medium">
                      Foto
                    </Avatar>
                    Contacto 5
                  </Space>
                </Menu.Item>
              </Menu>

            </Row>

          </Space>
        </Col>

        <Col span={16}>

          <Row>
            <Space size="middle">
              <Avatar className={contactsStyles.orangeAvatar} size="large">
                Foto
              </Avatar>
              <Title level={4} className={contactsStyles.contactTitle}>
                Pedro
              </Title>
            </Space>
          </Row>

          <Row justify="end">

            <Comment
              author="Juan"
              avatar={(
                <Avatar className={contactsStyles.orangeAvatar} size="medium">
                  Foto
                </Avatar>
                )}
              content="Hola Pedro"
            />

          </Row>

          <Row>
            <Comment
              author="Pedro"
              avatar={(
                <Avatar className={contactsStyles.orangeAvatar} size="medium">
                  Foto
                </Avatar>
                )}
              content="Hola Juan"
            />

          </Row>

          <Row justify="end">

            <Comment
              author="Juan"
              avatar={(
                <Avatar className={contactsStyles.orangeAvatar} size="medium">
                  Foto
                </Avatar>
                )}
              content="Espero hayas terminado tu trabajo"
            />

          </Row>

          <Row>
            <Comment
              author="Pedro"
              avatar={(
                <Avatar className={contactsStyles.orangeAvatar} size="medium">
                  Foto
                </Avatar>
                )}
              content="Por supuesto"
            />

          </Row>

          <Row gutter={12}>

            <Col flex="auto">
              <Input placeholder="Escribir mensaje..." />
            </Col>

            <Col>
              <Button shape="round">😎</Button>
            </Col>

            <Col>
              <Upload>
                <Button shape="round">Subir archivo</Button>
              </Upload>
            </Col>

            <Col>
              <Button type="primary" shape="round">Enviar</Button>
            </Col>

          </Row>

        </Col>
      </Row>

    </div>

  </div>
);

export default AdminContacts;
