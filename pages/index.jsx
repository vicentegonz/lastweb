import { useSelector } from 'react-redux';
import { selectUser } from '@/store/user/userReducer';
import GuestLanding from '@/components/landing/GuestLanding.jsx';
import LoggedLanding from '@/components/landing/LoggedLanding.jsx';
import PageLayout from '@/components/pageLayout/PageLayout.jsx';

const Login = () => {
  const user = useSelector(selectUser);

  return (
    <PageLayout>
      {user.status ? <LoggedLanding /> : <GuestLanding />}
    </PageLayout>
  );
};

export default Login;
