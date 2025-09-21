import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import SuccessMessage from '../components/Forms/SuccessMessage';

const AccountCreatedPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <AuthLayout>
      <SuccessMessage
        title="Account Created!"
        description="Your account has been created successfully!"
      />
    </AuthLayout>
  );
};

export default AccountCreatedPage;