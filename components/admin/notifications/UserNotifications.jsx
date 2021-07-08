import { useEffect, useState } from 'react';
import {
  string,
} from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { selectEvents, changeNotification } from '@/store/events/eventsReducer';
import { selectUser } from '@/store/user/userReducer';

import {
  Avatar, Menu, Space,
} from 'antd';

import notificationsStyles from './Notifications.module.scss';

const GetNotifications = ({ filteredText }) => {
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
    const filteredArray = initialData.filter(
      (f) => f.data.event.toLowerCase().includes(filteredText.toLowerCase()) || filteredText === '',
    );
    setCardData(filteredArray);
  }, [events.eventsData, user.selectedStore, filteredText]);

  const clickHandle = (idx) => {
    dispatch(changeNotification(idx));
  };

  return (
    <Menu mode="inline">
      {cardData && (cardData.length ? (cardData.map((event) => (
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
      )))
        : (
          <Menu.Item>
            {filteredText !== '' && `No hay notificaciones que contengan "${filteredText}"`}
          </Menu.Item>
        ))}
    </Menu>
  );
};

GetNotifications.propTypes = {
  filteredText: string.isRequired,
};

export default GetNotifications;
