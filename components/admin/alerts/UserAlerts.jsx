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
    const filteredArray = initialData.filter(
      (f) => f.data.event.toLowerCase().includes(filteredText.toLowerCase()) || filteredText === '',
    );
    setCardData(filteredArray);
  }, [alerts.alertsData, user.selectedStore, filteredText]);

  const clickHandle = (idx) => {
    dispatch(changeAlert(idx));
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
                {`Tienda ${alert.store}: ${alert.data.event}`}
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
