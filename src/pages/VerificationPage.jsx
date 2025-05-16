import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import VerificationForm from '../components/Forms/VerificationForm'

const VerificationPage = () => {
  return (
    <AuthLayout title="Enter Verification Code">
      <VerificationForm />
    </AuthLayout>
  );
};

export default VerificationPage;