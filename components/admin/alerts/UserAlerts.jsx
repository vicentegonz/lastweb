import { useEffect, useState } from 'react';
import {
  string,
} from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { selectAlerts, changeAlert } from '@/store/alerts/alertsReducer';
import { selectUser } from '@/store/user/userReducer';

import { AlertOutlined } from '@ant-design/icons';

import {
  Avatar, Menu, Space,
} from 'antd';

import alertStyles from './Alerts.module.scss';

const getDate = (date) => {
  if (date) {
    return new Date(date).toLocaleDateString('en-ZA');
  }
  return null;
};

const GetAlerts = ({ filteredText }) => {
  const alerts = useSelector(selectAlerts);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    if (!alerts.alertsData
      || Object.keys(alerts.alertsData).length === 0
      || !user.selectedStore) {
      return;
    }
    const initialData = alerts.alertsData[user.selectedStore] || [];
    const allObjects = initialData.reduce(((r, c) => Object.assign(r, c.data)), {});
    const result = [];
    let IDCount = 0;
    Object.entries(allObjects).forEach((item) => {
      Object.entries(item[1]).forEach((item2) => {
        const newobj = {
          createdAt: getDate(`${item[0].slice(0, 4)}-${item[0].slice(4, 6)}-${item[0].slice(6, 8)}`),
          id: IDCount,
          product: item2[0].toUpperCase(),
          event: item2[1],
          store: user.selectedStore,
        };
        IDCount += 1;
        if (item2[0].toLowerCase().includes(filteredText.toLowerCase())) {
          result.push(newobj);
        }
      });
    });

    setCardData(result.reverse());
  }, [alerts.alertsData, user.selectedStore, filteredText]);

  const clickHandle = (idx) => {
    const filteredAlert = cardData.filter(
      (f) => f.id === idx,
    ).pop();
    dispatch(changeAlert(filteredAlert));
  };

  return (
    <Menu mode="inline">
      {cardData && (cardData.length ? (cardData.map((alert) => (
        <Menu.Item key={alert.id}>
          <a role="button" onClick={() => clickHandle(alert.id)} onKeyDown={() => clickHandle(alert.id)} tabIndex={alert.id}>
            <Space size="middle">
              <Avatar className={alertStyles.orangeAvatar} size="medium">
                <AlertOutlined className={alertStyles.centeredIcon} />
              </Avatar>
              <span>
                {`${alert.createdAt}: ${alert.product}`}
              </span>
            </Space>
          </a>
        </Menu.Item>
      )))
        : (
          <Menu.Item>
            {filteredText !== '' && `No hay alertas que contengan "${filteredText}"`}
          </Menu.Item>
        ))}
    </Menu>
  );
};

GetAlerts.propTypes = {
  filteredText: string.isRequired,
};

export default GetAlerts;
