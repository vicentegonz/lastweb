import api from '@/api';

const continueWithGoogle = async (googleData) => {
  const response = await api.accounts.authenticate(googleData.tokenId);

  // eslint-disable-next-line no-console
  console.log(response.data);
};

export default continueWithGoogle;
