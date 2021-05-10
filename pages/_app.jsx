/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */

import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import store from '@/store';
import { AuthProvider } from '@/contexts/withAuth.jsx';

import '@/styles/global.scss';
import 'antd/dist/antd.css';

const App = ({ Component, pageProps }) => (
  <AuthProvider>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </AuthProvider>
);

App.propTypes = {
  pageProps: PropTypes.shape({}),
  Component: PropTypes.elementType,
};

export default App;
