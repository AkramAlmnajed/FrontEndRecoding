import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import PasswordResetForm from '../components/Forms/PasswordResetForm';


const PasswordResetPage = () => {
  return (
    <AuthLayout title="Password Reset">
      <PasswordResetForm />
    </AuthLayout>
  );
};

export default PasswordResetPage;