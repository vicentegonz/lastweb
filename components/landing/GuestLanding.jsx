import { useState } from 'react';
import {
  Row, Col, Space, Typography,
} from 'antd';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { save } from '@/store/user/userReducer';
import continueWithGoogle from '@/actions/GoogleAuth';
import api from '@/api';

import styles from './landing.module.scss';

const { Title } = Typography;

const showCorrectContent = (successfulLogin, refreshFunction) => {
  const currentMessage = successfulLogin;

  return (
    <>
      <Title level={2}>{currentMessage}</Title>
      { currentMessage === 'Loading'
        ? null
        : (
          <GoogleLogin
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
            className={styles.googleButton}
            buttonText="Ingresar con correo"
            onSuccess={refreshFunction}
            onFailure={refreshFunction}
            theme="dark"
            cookiePolicy="single_host_origin"
          />
        )}

    </>
  );
};

const GuestLanding = () => {
  const [successfulLogin, setSuccessfulLogin] = useState('');
  const dispatch = useDispatch();
  const storeUserData = async () => {
    try {
      const response = await api.account.accountData();
      if (response.data.stores.length === 0) {
        setSuccessfulLogin('Usuario no Identificado');
        return false;
      }
      dispatch(save(response.data));
      return true;
    } catch (err) {
      return false;
    }
  };

  const refreshOnceLogged = async (googleData) => {
    setSuccessfulLogin('Ingresando...');
    const loginResult = await continueWithGoogle(googleData);
    if (loginResult.status) {
      await storeUserData();
    } else {
      setSuccessfulLogin(loginResult.message);
    }
  };

  return (
    <div>
      <Row justify="center" align="middle" className={styles.rowCentered}>
        <Col>
          <Space direction="vertical" size={30} align="center">
            <img src="/images/logo.png" alt="me" width="256" height="140" />
            {showCorrectContent(successfulLogin, refreshOnceLogged)}
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default GuestLanding;
