import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { getAccessToken } from '@/actions/storeTokens';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Create client
const CLIENT = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  transformResponse: [
    ...axios.defaults.transformResponse,
    (data) => camelizeKeys(data),
  ],
  transformRequest: [
    (data) => decamelizeKeys(data),
    ...axios.defaults.transformRequest,
  ],
});

CLIENT.interceptors.request.use((config) => {
  const newConfig = config;
  if (getAccessToken()) {
    newConfig.headers.Authorization = `Bearer ${getAccessToken()}`;
  }
  const { params } = newConfig;
  return { ...newConfig, params: decamelizeKeys(params) };
});

export default CLIENT;
