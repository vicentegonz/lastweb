import CLIENT from './client';

const accounts = {
  authenticate: (idToken) => CLIENT.post('/social_auth/google/', { authToken: idToken }),
};

export default accounts;
