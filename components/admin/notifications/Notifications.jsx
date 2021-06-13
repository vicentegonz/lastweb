import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import api from '@/api';
import { save, clear } from '@/store/events/eventsReducer';
import { selectUser } from '@/store/user/userReducer';

import {
  Row, Col, Typography, Divider, Tabs, Input, Space,
} from 'antd';

import NotificationDetail from './NotificationDetail.jsx';
import GetNotifications from './UserNotifications.jsx';

import notificationsStyles from './Notifications.module.scss';

const { Title } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;

const AdminNotifications = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const storeEventsData = async () => {
      try {
        await user.stores.map(async (store) => {
          const response = await api.account.eventsData(store);
          const processedData = {};

          processedData.data = response.data.results;
          processedData.store = store;

          dispatch(save(processedData));
        });
        return true;
      } catch (err) {
        return false;
      }
    };
    dispatch(clear());
    storeEventsData();
  }, [dispatch, user.stores]);

  return (
    <div>
      <Row justify="space-around">
        <Col span={20}>
          <Title level={2}>
            Notificaciones
          </Title>
        </Col>
      </Row>

      <div>
        <Divider className={notificationsStyles.dividerA} />
      </div>

      <Row gutter={32}>
        <Col span={10}>
          <Space direction="vertical" size="small" className={notificationsStyles.fatherWidth}>

            <Row>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Todas" key="1" />
                <TabPane tab="Importante" key="2" />
                <TabPane tab="Entrega" key="3" />
                <TabPane tab="Recomendación" key="4" />
              </Tabs>
            </Row>

            <Row>
              <Search placeholder="Buscar Notificación" enterButton />
            </Row>

            <Row className={notificationsStyles.notificationContainer}>
              <GetNotifications />
            </Row>

          </Space>
        </Col>

        <Col span={14} className={notificationsStyles.colContainer}>
          <NotificationDetail />
        </Col>

      </Row>
    </div>
  );
};

export default AdminNotifications;
