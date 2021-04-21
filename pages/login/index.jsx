import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Layout from '../../components/layout.jsx';

export default function Login() {
  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <h1>Login Page</h1>
      <h2>
        <Link href="/">
          Back to home
        </Link>
      </h2>
    </Layout>
  );
}
