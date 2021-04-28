import CLIENT from './client';

const account = {
  authenticate: (idToken) => CLIENT.post('/authentication/google/', { idToken }),
};

export default account;
