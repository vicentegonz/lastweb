import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { selectAlerts } from '@/store/alerts/alertsReducer';
import { selectUser } from '@/store/user/userReducer';

import { AlertOutlined } from '@ant-design/icons';

import {
  Row, Col, Typography, Space, Avatar,
} from 'antd';

import alertStyles from './Alerts.module.scss';

const { Title } = Typography;

const AlertDetail = () => {
  const alerts = useSelector(selectAlerts);
  const user = useSelector(selectUser);
  const [cardData, setCardData] = useState();

  useEffect(() => {
    if (!alerts.alertsData
      || Object.keys(alerts.alertsData).length === 0
      || !user.selectedStore
      || !alerts.alertsData[user.selectedStore]
      || !alerts.selectedAlert) {
      return;
    }
    const id = alerts.selectedAlert;
    const alert = alerts.alertsData[user.selectedStore].filter((el) => el.id === id).pop();
    setCardData(alert);
  }, [alerts.alertsData, user.selectedStore, alerts.selectedAlert]);
  const getDate = () => {
    if (cardData) {
      return new Date(cardData.createdAt).toLocaleDateString('en-ZA');
    }
    return null;
  };

  return (
    cardData
      ? (
        <Space direction="vertical" className={alertStyles.fatherWidth} size="large">
          <Row justify="space-between" align="middle">
            <Col>
              <Space size="middle">
                <Avatar className={alertStyles.orangeAvatar} size="large">
                  <AlertOutlined />
                </Avatar>
                <Title level={3} className={alertStyles.contactTitle}>
                  {`Tienda: ${cardData ? cardData.store : null}`}
                </Title>
              </Space>
            </Col>
            <Col>
              <Title level={3} className={alertStyles.contactTitle}>
                {`Alerta ${cardData ? cardData.id : null}`}
              </Title>
            </Col>
            <Col>
              <Title level={5} className={alertStyles.contactTitle}>
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

export default AlertDetail;
