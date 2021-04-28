import api from '@/api';

const continueWithGoogle = async (googleData) => {
  const response = await api.account.authenticate(googleData.tokenId);

  // eslint-disable-next-line no-console
  console.log(response.data);
};

export default continueWithGoogle;
