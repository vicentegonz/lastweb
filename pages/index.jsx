import { useSelector } from 'react-redux';
import { selectUser } from '@/store/user/userReducer';
import GuestLanding from '@/components/landing/GuestLanding.jsx';
import LoggedLanding from '@/components/landing/LoggedLanding.jsx';

const Login = () => {
  const user = useSelector(selectUser);

  return (
    <>
      {user.status ? <LoggedLanding /> : <GuestLanding />}
    </>
  );
};

export default Login;
