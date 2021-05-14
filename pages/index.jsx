import continueWithGoogle from '@/actions/GoogleAuth.jsx';
import PageLayout from '@/components/pageLayout/PageLayout.jsx';
import { useState } from 'react';
import { useAuth } from '@/contexts/withAuth.jsx';
import {
  Row, Col, Avatar, Space, Typography,
} from 'antd';
import GoogleLogin from 'react-google-login';

import styles from '@/styles/landing.module.scss';

const { Title } = Typography;

const showCorrectContent = (alreadyLogged, successfulLogin, refreshFunction) => {
  let currentMessage = '';
  if (alreadyLogged || successfulLogin === 'Logged') {
    currentMessage = 'Bienvenido';
  } else if (successfulLogin === 'Failed') {
    currentMessage = 'Se ha producido un error. Inténtalo de nuevo.';
  } else if (successfulLogin === 'Loading') {
    currentMessage = 'Ingresando...';
  }

  return (
    <>
      <Title level={2}>{currentMessage}</Title>
      {alreadyLogged || successfulLogin
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
  const alreadyLogged = useAuth();
  const [successfulLogin, setSuccessfulLogin] = useState(null);

  const refreshOnceLogged = async (googleData) => {
    setSuccessfulLogin('Loading');
    const loginResult = await continueWithGoogle(googleData);
    if (loginResult) {
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
            {showCorrectContent(alreadyLogged, successfulLogin, refreshOnceLogged)}
          </Space>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default Login;
