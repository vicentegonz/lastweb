import api from '@/api';

const ContinueWithGoogle = async (googleData) => {
  try {
    const response = await api.account.authenticate(googleData.tokenId);
    localStorage.setItem('token', response.data.access);
    localStorage.setItem('refresh', response.data.refresh);
  } catch (err) {
    // pass
  }
};

export default ContinueWithGoogle;
