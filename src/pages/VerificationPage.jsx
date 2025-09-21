import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import { useVerification } from '../components/context/VerificationContext';
import ErrorMessage from '../components/FormElements/error_message';
import VerificationForm from '../components/Forms/VerificationForm';

const VerificationPage = () => {
  const { forgotPass, verify } = useVerification()
  const email = localStorage.getItem("forgotPassEmail")
  const navigate = useNavigate()
  const [serverError, setServerError] = useState()

  async function submit(payload) {
    const result = await verify({ email: payload.email, code: payload.code })
    if (result.ok) {
      setServerError(null);
      navigate('/resetPass')
    } else {
      setServerError(result.error);

    }


  }

  async function resend() {
    await forgotPass(email)
    console.log("code resent successfully")
  }

  return (
    <AuthLayout title="Enter Verification Code">
      <VerificationForm onSubmit={submit} resend={resend} email={email} />
      <ErrorMessage message={serverError} />
    </AuthLayout>
  );
};

export default VerificationPage;