import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import utilStyles from '@/styles/utils.module.scss';
import styles from './layout.module.scss';

const name = 'Arcoprime';
export const siteTitle = 'Arcoprime App';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <p className={utilStyles.colorInherit}>{name}</p>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            ← Volver atrás
          </Link>
        </div>
      )}
    </div>
  );
}

Layout.defaultProps = {
  children: null,
  home: false,
};

Layout.propTypes = {
  children: PropTypes.element,
  home: PropTypes.bool,
};
