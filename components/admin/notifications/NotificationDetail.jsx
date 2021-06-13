import { useSelector } from 'react-redux';
import { selectEvents } from '@/store/events/eventsReducer';
import {
  Row, Col, Typography, Space, Avatar,
} from 'antd';

import notificationsStyles from './Notifications.module.scss';

const { Title } = Typography;

const NotificationDetail = () => {
  const events = useSelector(selectEvents);
  const id = events.selectedNotification;

  const event = events.eventsData[id];
  const getDate = () => {
    if (event !== null) {
      return new Date(event.createdAt).toLocaleDateString('en-ZA');
    }
    return null;
  };

  return (
    id !== null
      ? (
        <Space direction="vertical" className={notificationsStyles.fatherWidth} size="large">
          <Row justify="space-between" align="middle">
            <Col>
              <Space size="middle">
                <Avatar className={notificationsStyles.orangeAvatar} size="large">
                  Icono
                </Avatar>
                <Title level={3} className={notificationsStyles.contactTitle}>
                  {`Tienda: ${event ? event.store : null}`}
                </Title>
              </Space>
            </Col>
            <Col>
              <Title level={3} className={notificationsStyles.contactTitle}>
                {`Notificación ${id}`}
              </Title>
            </Col>
            <Col>
              <Title level={5} className={notificationsStyles.contactTitle}>
                {`fecha:${getDate()}`}
              </Title>
            </Col>
          </Row>
          <Row justify="center">
            <Col>
              <p>{event ? event.data.event : 'cargando'}</p>
            </Col>
          </Row>
        </Space>
      )
      : <div />
  );
};

export default NotificationDetail;
