import { useRouter } from 'next/router';
import {
  createContext, useContext, useState, useEffect,
} from 'react';
import { clearTokens, getAccessToken } from '@/actions/storeTokens';
import PropTypes from 'prop-types';
import api from '@/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let validated = null;
    const checkPermissions = async () => {
      setLoaded(null);
      const currentToken = getAccessToken();
      if (currentToken) {
        try {
          await api.account.validate(currentToken);
          validated = true;
          setUser(true);
        } catch (e) {
          clearTokens();
          validated = null;
        }
      } else {
        validated = null;
      }
      if (router.pathname !== '/' && validated === null) {
        router.push('/');
      } else {
        setLoaded(true);
      }
    };
    checkPermissions();
  }, [router]);

  return (
    <AuthContext.Provider value={user}>{loaded ? children : <div />}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, useAuth };
