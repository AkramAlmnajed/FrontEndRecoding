import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import ResetPasswordForm from '../components/Forms/ResetPasswordForm';

const ResetPasswordPage = () => {
  const extraContent = (
    <p className="text-center text-sm text-gray-600">
      Remember your password?{" "}
      <a href="/login" className="hover:text-blue-800 border-b-2">
        Login now
      </a>
    </p>
  );
  const navigate = useNavigate()
  function handleResetPassword(data) {
    console.log("Form Data:", data);
    //call resetPass api
    navigate("/passReseted")
  }

  return (
    <AuthLayout title="Reset Password">
      <ResetPasswordForm
        buttonText="Reset"
        onSubmit={handleResetPassword}
        extraContent={extraContent} />
    </AuthLayout>
  );
};

export default ResetPasswordPage;