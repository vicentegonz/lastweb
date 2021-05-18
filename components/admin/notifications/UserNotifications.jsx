import { useSelector, useDispatch } from 'react-redux';
import { selectEvents, changeNotification } from '@/store/events/eventsReducer';

import {
  Avatar, Menu, Space,
} from 'antd';

import notificationsStyles from './Notifications.module.scss';

const GetNotifications = () => {
  const events = useSelector(selectEvents);
  const dispatch = useDispatch();

  const clickHandle = (idx) => {
    dispatch(changeNotification(idx));
  };

  return (
    <Menu mode="inline">
      {events.eventsData.map((event, index) => (
        <Menu.Item key={event.id}>
          <a role="button" onClick={() => clickHandle(index)} onKeyDown={() => clickHandle(index)} tabIndex={index}>
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
