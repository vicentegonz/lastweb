import { useState } from 'react';
import {
  Row, Col, Avatar, Space, Typography,
} from 'antd';
import GoogleLogin from 'react-google-login';
import { useSelector, useDispatch } from 'react-redux';
import { save, selectUser } from '@/store/user/userReducer';
import continueWithGoogle from '@/actions/GoogleAuth';
import PageLayout from '@/components/pageLayout/PageLayout.jsx';
import api from '@/api';

import styles from '@/styles/landing.module.scss';

const { Title } = Typography;

const showCorrectContent = (successfulLogin, refreshFunction, user) => {
  let currentMessage = '';
  if (successfulLogin === 'Logged' || user.givenName) {
    currentMessage = `Bienvenido, ${user.givenName}`;
  } else if (successfulLogin === 'Failed') {
    currentMessage = 'Se ha producido un error. Inténtalo de nuevo.';
  } else if (successfulLogin === 'Loading') {
    currentMessage = 'Ingresando...';
  }

  return (
    <>
      <Title level={2}>{currentMessage}</Title>
      {successfulLogin || user.givenName
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

const Login = () => {
  const [successfulLogin, setSuccessfulLogin] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const storeUserData = async () => {
    try {
      const response = await api.account.accountData();
      dispatch(save(response.data));
      return true;
    } catch (err) {
      return false;
    }
  };

  const refreshOnceLogged = async (googleData) => {
    setSuccessfulLogin('Loading');
    const loginResult = await continueWithGoogle(googleData);
    if (loginResult) {
      await storeUserData();
      setSuccessfulLogin('Logged');
    } else {
      setSuccessfulLogin('Failed');
    }
  };

  return (
    <PageLayout home>
      <Row justify="center" align="middle" className={styles.rowCentered}>
        <Col>
          <Space direction="vertical" size={30} align="center">
            <Avatar
              className={styles.googleLogin}
              size={{
                xs: 72, sm: 96, md: 120, lg: 192, xl: 240, xxl: 300,
              }}
            >
              Logo
            </Avatar>
            {showCorrectContent(successfulLogin, refreshOnceLogged, user)}
          </Space>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default Login;
