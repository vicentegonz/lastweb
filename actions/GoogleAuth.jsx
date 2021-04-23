import axios from 'axios';

const continueWithGoogle = async (googleData) => {
  const details = {
    auth_token: googleData.tokenId,
  };

  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/social_auth/google/`, { ...details });
  } catch (err) {
    //
  }
};

export default continueWithGoogle;
