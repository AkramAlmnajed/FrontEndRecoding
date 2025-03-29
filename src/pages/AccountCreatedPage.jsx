import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import AccountCreated from '../components/Forms/AccountCreated';

const AccountCreatedPage = () => {
  return (
    <AuthLayout title="">
      <AccountCreated />
    </AuthLayout>
  );
};

export default AccountCreatedPage;