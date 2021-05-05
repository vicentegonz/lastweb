import continueWithGoogle from '@/actions/GoogleAuth.jsx';
import Head from 'next/head';
import Layout from '@/components/layout/Layout.jsx';
import GoogleLogin from 'react-google-login';
import Counter from '@/components/counter/counter.jsx';

const Login = () => (
  <Layout>
    <Head>
      <title>Login</title>
    </Head>
    <h1>Login Page</h1>
    <br />
    <GoogleLogin
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
      buttonText="Log in with Google"
      onSuccess={continueWithGoogle}
      onFailure={continueWithGoogle}
      cookiePolicy="single_host_origin"
    />
    <Counter />
  </Layout>
);

export default Login;
