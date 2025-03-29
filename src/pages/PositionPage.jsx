import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import PositionForm from '../components/Forms/PositionForm'

const PositionPage = () => {
  return (
    <AuthLayout title="Specify Your Position">
      <PositionForm />
    </AuthLayout>
  );
};

export default PositionPage;