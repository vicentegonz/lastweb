import api from '@/api';
import { saveTokens } from './storeTokens';

const ContinueWithGoogle = async (googleData) => {
  try {
    const response = await api.account.authenticate(googleData.tokenId);
    saveTokens(response.data.access, response.data.refresh);
    return true;
  } catch (err) {
    return false;
  }
};

export default ContinueWithGoogle;
