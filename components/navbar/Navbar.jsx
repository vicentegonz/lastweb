import Link from 'next/link';
import NotificationsDropDown from '@/components/notificationsDropDown/NotificationsDropDown.jsx';
import Settings from '@/components/settings/Settings.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, clear } from '@/store/user/userReducer';
import { useRouter } from 'next/router';
import { clearTokens } from '@/actions/storeTokens';

import {
  Menu, Dropdown, Row, Col, Space, Avatar,
} from 'antd';
import {
  PieChartOutlined, ContactsOutlined, ShopOutlined,
  SettingOutlined, BellOutlined, LogoutOutlined,
} from '@ant-design/icons';

import styles from './Navbar.module.scss';

const Navbar = () => {
  const user = useSelector(selectUser);
  const router = useRouter();
  const dispatch = useDispatch();

  const logoutAction = () => {
    clearTokens();
    dispatch(clear());
    router.push('/');
  };

  const logoutMenu = (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item onClick={logoutAction} icon={<LogoutOutlined />}>
        Cerrar sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Row justify="space-around" align="middle">
        <Col span={5}>
          <Link href="/">
            <a>
              <img src="/images/logo.png" alt="me" width="130" height="70" />
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
              <Col>
                <div className={styles.userInfoContainer}>
                  <span className={styles.userProfilePic}>
                    <Avatar className={styles.orangeAvatar} size="medium">
                      Foto
                    </Avatar>
                  </span>
                  <span className={styles.userInfo}>
                    <Space direction="vertical">
                      <span>
                        {user.givenName}
                      </span>
                      <span>
                        Jefe de Zona
                      </span>
                    </Space>
                  </span>
                </div>
              </Col>
            </Space>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={20}>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="reports" icon={<PieChartOutlined />}>
              <Link href="/reports">
                <a>
                  Reportes
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
          </Menu>
        </Col>
        <Col span={4}>
          {logoutMenu}
        </Col>
      </Row>
    </>
  );
};

export default Navbar;
