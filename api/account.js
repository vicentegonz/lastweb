import CLIENT from './client';

const account = {
  authenticate: (idToken) => CLIENT.post('/v1/authentication/google/', { idToken }),
};

export default account;
