import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { selectEvents } from '@/store/events/eventsReducer';
import { selectUser } from '@/store/user/userReducer';

import {
  Row, Col, Typography, Space, Avatar,
} from 'antd';

import notificationsStyles from './Notifications.module.scss';

const { Title } = Typography;

const NotificationDetail = () => {
  const events = useSelector(selectEvents);
  const user = useSelector(selectUser);
  const [cardData, setCardData] = useState();

  useEffect(() => {
    if (!events.eventsData
      || Object.keys(events.eventsData).length === 0
      || !user.selectedStore
      || !events.eventsData[user.selectedStore]
      || !events.selectedNotification) {
      return;
    }
    const id = events.selectedNotification;
    const event = events.eventsData[user.selectedStore].filter((el) => el.id === id).pop();
    setCardData(event);
  }, [events.eventsData, user.selectedStore, events.selectedNotification]);
  const getDate = () => {
    if (cardData) {
      return new Date(cardData.createdAt).toLocaleDateString('en-ZA');
    }
    return null;
  };

  return (
    cardData
      ? (
        <Space direction="vertical" className={notificationsStyles.fatherWidth} size="large">
          <Row justify="space-between" align="middle">
            <Col>
              <Space size="middle">
                <Avatar className={notificationsStyles.orangeAvatar} size="large">
                  Icono
                </Avatar>
                <Title level={3} className={notificationsStyles.contactTitle}>
                  {`Tienda: ${cardData ? cardData.store : null}`}
                </Title>
              </Space>
            </Col>
            <Col>
              <Title level={3} className={notificationsStyles.contactTitle}>
                {`Notificación ${cardData ? cardData.id : null}`}
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
              <p>{cardData ? cardData.data.event : 'cargando'}</p>
            </Col>
          </Row>
        </Space>
      )
      : <div />
  );
};

export default NotificationDetail;
