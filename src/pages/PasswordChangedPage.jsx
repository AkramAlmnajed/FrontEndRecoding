import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import SuccessMessage from '../components/Forms/SuccessMessage';

const PasswordChangedPage = () => {

  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 5000);
  })

  return (
    <AuthLayout title="">
      <SuccessMessage
        title="Password Changed!"
        description="Your password has been changed successfully!"
      />
    </AuthLayout>
  );
};

export default PasswordChangedPage;