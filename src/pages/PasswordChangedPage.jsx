import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import PasswordChanged from '../components/Forms/PasswordChanged';

const PasswordChangedPage = () => {
  return (
    <AuthLayout title="">
      <PasswordChanged />
    </AuthLayout>
  );
};

export default PasswordChangedPage;