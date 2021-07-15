import { useSelector } from 'react-redux';
import { selectUser } from '@/store/user/userReducer';
import GuestLanding from '@/components/landing/GuestLanding.jsx';
import PageLayout from '@/components/pageLayout/PageLayout.jsx';
import KpiFrame from '@/components/kpi/KpiFrame.jsx';

const Login = () => {
  const user = useSelector(selectUser);

  return (
    <PageLayout>
      {user.status ? <KpiFrame /> : <GuestLanding />}
    </PageLayout>
  );
};

export default Login;
