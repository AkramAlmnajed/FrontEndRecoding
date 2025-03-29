import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import ResetPasswordForm from '../components/Forms/ResetPasswordForm';

const ResetPasswordPage = () => {
  return (
    <AuthLayout title="Reset Password">
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPasswordPage;