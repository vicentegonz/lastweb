import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Layout, { siteTitle } from '@/components/layout/layout.jsx';
import utilStyles from '@/styles/utils.module.scss';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Arcoprime application template.</p>
      </section>
      <h2>
        <Link href="/login">
          Login
        </Link>
      </h2>
    </Layout>
  );
}
