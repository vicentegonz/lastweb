import Link from 'next/link';
import NotificationsDropDown from '@/components/notificationsDropDown/NotificationsDropDown.jsx';
import Image from 'next/image';
import Settings from '@/components/settings/Settings.jsx';
import Logout from '@/components/logout/Logout.jsx';

import {
  Menu, Dropdown, Row, Col, Space,
} from 'antd';
import {
  PieChartOutlined, ContactsOutlined, ShopOutlined, SettingOutlined, BellOutlined,
} from '@ant-design/icons';

import styles from './Navbar.module.scss';

const Navbar = () => (
  <>
    <Row justify="space-around" align="middle">
      <Col span={5}>
        <Link href="/">
          <a>
            <Image src="/images/logo.png" alt="me" width="130" height="70" />
          </a>
        </Link>
      </Col>
      <Col span={15}>
        <Row justify="end" align="middle">
          <Space size="large">
            <Col>
              <Dropdown overlay={NotificationsDropDown} trigger={['click']} placement="bottomCenter">
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
            <Link href="/reports">
              <a>
                Reportes
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="contacts" icon={<ContactsOutlined />}>
            <Link href="/contacts">
              <a>
                Contactos
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="stores" icon={<ShopOutlined />}>
            <Link href="/stores">
              <a>
                Tiendas
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="notifications" icon={<BellOutlined />}>
            <Link href="/notifications">
              <a>
                Notificaciones
              </a>
            </Link>
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  </>
);

export default Navbar;
