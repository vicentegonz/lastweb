import continueWithGoogle from '@/actions/GoogleAuth.jsx';
import PageLayout from '@/components/pageLayout/PageLayout.jsx';

import {
  Row, Col, Avatar, Space,
} from 'antd';
import GoogleLogin from 'react-google-login';

import styles from '@/styles/landing.module.scss';

const Login = () => (
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
          <GoogleLogin
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
            className={styles.googleButton}
            buttonText="Log in with Google"
            onSuccess={continueWithGoogle}
            onFailure={continueWithGoogle}
            theme="dark"
            cookiePolicy="single_host_origin"
          />
        </Space>
      </Col>
    </Row>
  </PageLayout>
);

export default Login;
