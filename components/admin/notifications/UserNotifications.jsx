import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectEvents, changeNotification } from '@/store/events/eventsReducer';
import { selectUser } from '@/store/user/userReducer';

import {
  Avatar, Menu, Space,
} from 'antd';

import notificationsStyles from './Notifications.module.scss';

const GetNotifications = () => {
  const events = useSelector(selectEvents);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    if (!events.eventsData
      || Object.keys(events.eventsData).length === 0
      || !user.selectedStore) {
      return;
    }
    const initialData = events.eventsData[user.selectedStore];
    setCardData(initialData);
  }, [events.eventsData, user.selectedStore]);

  const clickHandle = (idx) => {
    dispatch(changeNotification(idx));
  };

  return (
    <Menu mode="inline">
      {cardData && cardData.map((event) => (
        <Menu.Item key={event.id}>
          <a role="button" onClick={() => clickHandle(event.id)} onKeyDown={() => clickHandle(event.id)} tabIndex={event.id}>
            <Space size="middle">
              <Avatar className={notificationsStyles.orangeAvatar} size="medium">
                Icono
              </Avatar>
              <span>
                {`Tienda ${event.store}: ${event.data.event}`}
              </span>
            </Space>
          </a>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default GetNotifications;
