import Head from 'next/head';
import Link from 'next/link';

import Navbar from '@/components/navbar/Navbar.jsx';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/user/userReducer';

import styles from './PageLayout.module.scss';

const appName = 'Arcoprime';
const siteTitle = 'Arcoprime App';
const { Header, Content, Footer } = Layout;

const PageLayout = ({ children }) => {
  const user = useSelector(selectUser);

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <link
        rel="preload"
        href="/fonts/roboto/Roboto-Regular.ttf"
        as="font"
        crossOrigin=""
      />
      <link
        rel="preload"
        href="/fonts/roboto/Roboto-Italic.ttf"
        as="font"
        crossOrigin=""
      />
      <link
        rel="preload"
        href="/fonts/roboto/Roboto-Bold.ttf"
        as="font"
        crossOrigin=""
      />
      {user.givenName ? (
        <Header className={styles.fixNavBar}>
          <Navbar />
        </Header>
      ) : (
        <Header className={styles.fixNavBar}>
          <Link href="/">
            <a>
              <img src="/images/logo.png" alt="me" width="130" height="70" />
            </a>
          </Link>
        </Header>
      )}

      <Layout className={`${styles.pageContainer} site-layout`}>
        <Content className={styles.container}>
          <div className={`site-layout-content ${styles.containerHorizontalMargin}`}>
            {children}
          </div>
        </Content>
        <Footer className={styles.footer}>
          {`${appName} ©2021`}
        </Footer>
      </Layout>
    </>
  );
};

PageLayout.defaultProps = {
  children: null,
};

PageLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default PageLayout;
