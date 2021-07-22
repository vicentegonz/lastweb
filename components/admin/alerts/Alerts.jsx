import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectAlerts, getAlertDataFromApi, clearAlerts, startLoadingAlerts,
} from '@/store/alerts/alertsReducer';
import { selectUser } from '@/store/user/userReducer';

import {
  Row, Col, Typography, Divider, Input, Space, Affix,
} from 'antd';

import StoreSelector from '@/components/selectors/StoreSelector.jsx';
import Loading from '@/components/global/Loading.jsx';
import AlertDetail from './AlertDetail.jsx';
import GetAlerts from './UserAlerts.jsx';

import alertStyles from './Alerts.module.scss';

const { Title } = Typography;
const { Search } = Input;

const AdminAlerts = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);
  const alerts = useSelector(selectAlerts);
  const dispatch = useDispatch();
  const [filteredText, setFilteredText] = useState('');

  useEffect(() => {
    const storeAlertsData = async () => {
      if (!user.stores) {
        return;
      }
      user.stores.forEach((store) => {
        dispatch(getAlertDataFromApi(store));
      });
    };
    dispatch(startLoadingAlerts());
    dispatch(clearAlerts());
    storeAlertsData();
  }, [dispatch, user.stores]);

  useEffect(() => {
    setLoading(true);
    if (!alerts.loading) {
      setLoading(false);
    }
  }, [alerts.loading]);

  const changeFilter = (event) => {
    setFilteredText(event.target.value);
  };

  return (
    <div>
      <Affix offsetTop={64}>
        <Row justify="space-between" align="bottom" className={alertStyles.fixedRow}>

          <Col flex="auto">
            <Row>
              <Title level={3} className={alertStyles.bottomAligned}>
                <Space>
                  Alertas de la Tienda:
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
        <Divider className={alertStyles.dividerA} />
      </div>

      <Row gutter={32}>
        <Col span={10}>
          <Space direction="vertical" size="small" className={alertStyles.fatherWidth}>
            <Row>
              <Search
                placeholder="Buscar Alerta"
                onChange={changeFilter}
                enterButton
              />
            </Row>

            {loading && <Loading />}

            {!loading && (
            <Row className={alertStyles.alertContainer}>
              <GetAlerts
                filteredText={filteredText}
              />
            </Row>
            )}

          </Space>
        </Col>

        <Col span={14} className={alertStyles.colContainer}>
          <AlertDetail />
        </Col>

      </Row>
    </div>
  );
};

export default AdminAlerts;
