/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */

import PropTypes from 'prop-types';
import React from 'react';
import '@/styles/global.scss';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

App.propTypes = {
  pageProps: PropTypes.shape({}),
  Component: PropTypes.elementType,
};
