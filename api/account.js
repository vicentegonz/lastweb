import { saveTokens, getAccessToken, getRefreshToken } from '@/actions/storeTokens';
import CLIENT from './client';

const account = {
  authenticate: (idToken) => CLIENT.post('/v1/authentication/google/', { idToken }),
  validate: (token) => CLIENT.post('/v1/authentication/token/validate/', { token }),
  refresh: (refresh) => CLIENT.post('/v1/authentication/token/refresh/', { refresh }),
  accountData: () => CLIENT.get('v1/account'),
  eventsData: (id) => CLIENT.get(`/v1/operations/stores/${id}/events?size=15`),
  kpiData: (id) => CLIENT.get(`/v1/operations/stores/${id}/kpis`),
};

// Interceptor for refreshing tokens automatically
const refreshTokenInterceptor = () => {
  const interceptor = CLIENT.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status !== 401) {
        return Promise.reject(error);
      }

      CLIENT.interceptors.response.eject(interceptor);
      const refreshToken = getRefreshToken();
      try {
        const response = await account.refresh(refreshToken);
        saveTokens(response.data.access, response.data.refresh);
        const token = getAccessToken();

        if (error.response.config.url === '/v1/authentication/token/validate/') {
          return await account.validate(token);
        }
        const newRequest = error.response.config;

        newRequest.headers.Authorization = `Bearer ${token}`;

        return await CLIENT(newRequest);
      } catch (err) {
        return Promise.reject(err);
      } finally {
        refreshTokenInterceptor();
      }
    },
  );
};

refreshTokenInterceptor();

export default account;
