import api from '@/api';
import {
  saveTokens,
} from './storeTokens';

const ContinueWithGoogle = async (googleData) => {
  try {
    const response = await api.account.authenticate(googleData.tokenId);
    saveTokens(response.data.access, response.data.refresh);
    return { status: true, message: 'Success' };
  } catch (err) {
    if (err.response && err.response.status === 400) {
      return {
        status: false,
        message: 'Usuario No Encontrado',
      };
    }
    return {
      status: false,
      message: 'Se ha producido un error. Inténtalo de nuevo.',
    };
  }
};

export default ContinueWithGoogle;
