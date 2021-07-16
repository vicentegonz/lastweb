import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { clear } from '@/store/user/userReducer';
import { useRouter } from 'next/router';
import { clearTokens } from '@/actions/storeTokens';

import {
  Menu, Row, Col,
} from 'antd';
import {
  // PieChartOutlined, TeamOutlined, ShopOutlined
  LogoutOutlined, AlertOutlined, SmileOutlined, BarChartOutlined, RiseOutlined,
} from '@ant-design/icons';

import styles from './Navbar.module.scss';

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const logoutAction = () => {
    clearTokens();
    dispatch(clear());
    router.push('/');
  };

  const logoutMenu = (
    <Menu mode="horizontal" className={styles.menuColor}>
      <Menu.Item onClick={logoutAction} icon={<LogoutOutlined />}>
        CERRAR SESIÓN
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Row className={styles.parentHeight}>
        <Col xs={0} xl={3}>
          <Link href="/">
            <a>
              <img src="/images/logo.png" alt="me" width="130" height="70" />
            </a>
          </Link>
        </Col>
        <Col span={12} className={styles.parentHeight}>
          <Menu mode="horizontal" className={styles.menuColor}>
            {/* <Menu.Item key="reports" icon={<PieChartOutlined />}>
              <Link href="/reports">
                <a className={styles.fontColor}>
                  REPORTES
                </a>
              </Link>
            </Menu.Item> */}
            <Menu.Item key="alerts" icon={<AlertOutlined />}>
              <Link href="/alerts">
                <a className={styles.fontColor}>
                  ALERTAS
                </a>
              </Link>
            </Menu.Item>
            {/* <Menu.Item key="contacts" icon={<TeamOutlined />}>
              <Link href="/contacts">
                <a className={styles.fontColor}>
                  CONTACTOS
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="stores" icon={<ShopOutlined />}>
              <Link href="/stores">
                <a className={styles.fontColor}>
                  TIENDAS
                </a>
              </Link>
            </Menu.Item> */}
            <Menu.Item key="kpi" icon={<BarChartOutlined />}>
              <Link href="/kpi">
                <a className={styles.fontColor}>
                  ESTADÍSTICAS
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="ksi" icon={<SmileOutlined />}>
              <Link href="/ksi">
                <a className={styles.fontColor}>
                  SERVICIO
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="predictions" icon={<RiseOutlined />}>
              <Link href="/predictions">
                <a className={styles.fontColor}>
                  PREDICCIONES
                </a>
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={4} offset={5} className={styles.parentHeight}>
          {logoutMenu}
        </Col>
      </Row>
    </>
  );
};

export default Navbar;
