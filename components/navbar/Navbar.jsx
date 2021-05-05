import Link from 'next/link';
import Notifications from '@/components/notifications/Notifications.jsx';
import Settings from '@/components/settings/Settings.jsx';
import Logout from '@/components/logout/Logout.jsx';

import {
  Menu, Dropdown, Row, Col, Space,
} from 'antd';
import {
  PieChartOutlined, LikeOutlined, ContactsOutlined, ShopOutlined, SettingOutlined, BellOutlined,
} from '@ant-design/icons';

import styles from './Navbar.module.scss';

export default function Navbar() {
  return (
    <>
      <Row justify="space-around" align="middle">
        <Col span={5}>
          <Link href="/">
            <a>
              <img src="https://via.placeholder.com/150x50" alt="" />
            </a>
          </Link>
        </Col>
        <Col span={15}>
          <Row justify="end" align="middle">
            <Space size="large">
              <Col>
                <Dropdown overlay={Notifications} trigger={['click']} placement="bottomCenter">
                  <BellOutlined className={styles.navIcons} />
                </Dropdown>
              </Col>
              <Col>
                <Dropdown overlay={Settings} trigger={['click']} placement="bottomCenter">
                  <SettingOutlined className={styles.navIcons} />
                </Dropdown>
              </Col>
              <Dropdown overlay={Logout} trigger={['click']} placement="bottomCenter">
                <div className={styles.userInfoContainer}>
                  <span className={styles.userProfilePic}>
                    <img src="https://via.placeholder.com/50x50" alt="" />
                  </span>
                  <span className={styles.userInfo}>
                    <Space direction="vertical">
                      <span>
                        Juanito Perez
                      </span>
                      <span>
                        Jefe de Zona
                      </span>
                    </Space>
                  </span>
                </div>
              </Dropdown>
            </Space>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="reports" icon={<PieChartOutlined />}>
              <Link href="/reports" as="reportes">
                <a>
                  Reportes
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="recommendations" icon={<LikeOutlined />}>
              <Link href="/recommendations" as="recomendaciones">
                <a>
                  Recomendaciones
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="contacts" icon={<ContactsOutlined />}>
              <Link href="/contacts" as="contactos">
                <a>
                  Contactos
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="stores" icon={<ShopOutlined />}>
              <Link href="/stores" as="tiendas">
                <a>
                  Tiendas
                </a>
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </>
  );
}
