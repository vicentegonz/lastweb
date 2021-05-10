import CLIENT from './client';

const account = {
  authenticate: (idToken) => CLIENT.post('/v1/authentication/google/', { idToken }),
  validate: (token) => CLIENT.post('/v1/authentication/token/validate/', { token }),
  refresh: (refresh) => CLIENT.post('/v1/authentication/token/refresh/', { refresh }),
};

export default account;
