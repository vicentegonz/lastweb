/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */

import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import store from '@/store';
import AuthProvider from '@/components/global/Authentication.jsx';

import '@/styles/global.scss';
import 'antd/dist/antd.css';

const App = ({ Component, pageProps }) => (
  <Provider store={store}>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </Provider>
);

App.propTypes = {
  pageProps: PropTypes.shape({}),
  Component: PropTypes.elementType,
};

export default App;
