import Head from 'next/head';
import Link from 'next/link';

import Navbar from '@/components/navbar/Navbar.jsx';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import utilStyles from '@/styles/utils.module.scss';
import styles from './PageLayout.module.scss';

const appName = 'Arcoprime';
const siteTitle = 'Arcoprime App';
const { Header, Content, Footer } = Layout;

const PageLayout = ({ children, home }) => (
  <>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    {home ? (
      <Header>
        <Link href="/">
          <a>
            <img src="https://via.placeholder.com/150x50" alt="" />
          </a>
        </Link>
      </Header>
    ) : (
      <Navbar />
    )}

    <Layout className={`${styles.pageContainer} layout`}>
      <Content className={styles.container}>
        <div className="site-layout-content">
          {children}
        </div>
      </Content>
      <Footer className={utilStyles.alignCenter}>
        {`${appName} ©2021`}
      </Footer>
    </Layout>
  </>
);

PageLayout.defaultProps = {
  children: null,
  home: false,
};

PageLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  home: PropTypes.bool,
};

export default PageLayout;
