import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import api from '@/api';
import { save } from '@/store/events/eventsReducer';
import { selectUser } from '@/store/user/userReducer';

import {
  Row, Col, Typography, Divider, Input, Space, Affix,
} from 'antd';

import StoreSelector from '@/components/selectors/StoreSelector.jsx';
import Loading from '@/components/global/Loading.jsx';
import NotificationDetail from './NotificationDetail.jsx';
import GetNotifications from './UserNotifications.jsx';

import notificationsStyles from './Notifications.module.scss';

const { Title } = Typography;
const { Search } = Input;

const AdminNotifications = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [filteredText, setFilteredText] = useState('');

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
        setLoading(false);
        return true;
      } catch (err) {
        return false;
      }
    };
    storeEventsData();
  }, [dispatch, user.stores]);
  const changeFilter = (event) => {
    setFilteredText(event.target.value);
  };
  return (
    <div>
      <Affix offsetTop={64}>
        <Row justify="space-between" align="bottom" className={notificationsStyles.fixedRow}>

          <Col flex="auto">
            <Row>
              <Title level={3} className={notificationsStyles.bottomAligned}>
                <Space>
                  Notificaciones de la Tienda:
                  {user.selectedStore}
                </Space>
              </Title>
            </Row>
          </Col>

          <Col>
            <Space>
              <StoreSelector />
            </Space>
          </Col>

        </Row>
      </Affix>

      <div>
        <Divider className={notificationsStyles.dividerA} />
      </div>

      <Row gutter={32}>
        <Col span={10}>
          <Space direction="vertical" size="small" className={notificationsStyles.fatherWidth}>
            <Row>
              <Search
                placeholder="Buscar Notificación"
                onChange={changeFilter}
                setFilteredText={setFilteredText}
                enterButton
              />
            </Row>

            {loading && <Loading />}

            {!loading && (
            <Row className={notificationsStyles.notificationContainer}>
              <GetNotifications
                filteredText={filteredText}
              />
            </Row>
            )}

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
