import { useRouter } from 'next/router';
import {
  useState, useEffect,
} from 'react';
import { clearTokens, getAccessToken } from '@/actions/storeTokens';
import { useSelector, useDispatch } from 'react-redux';
import { save, selectUser, clear } from '@/store/user/userReducer';
import PropTypes from 'prop-types';
import api from '@/api';

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(null);
  const storedUser = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    let validated = null;
    const checkPermissions = async () => {
      setLoaded(null);
      const currentToken = getAccessToken();
      if (currentToken) {
        try {
          await api.account.validate(currentToken);
          validated = true;
          if (!storedUser.givenName) {
            const response = await api.account.accountData();
            dispatch(save(response.data));
          }
        } catch (e) {
          clearTokens();
          dispatch(clear());
          validated = null;
        }
      } else {
        dispatch(clear());
        validated = null;
      }
      if (router.pathname !== '/' && validated === null) {
        router.push('/');
      } else {
        setLoaded(true);
      }
    };
    checkPermissions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, dispatch]);

  return (
    <>{loaded ? children : <div />}</>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
