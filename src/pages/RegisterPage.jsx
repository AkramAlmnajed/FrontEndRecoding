import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import RegisterForm from '../components/Forms/RegisterForm';

const RegisterPage = () => {
  return (
    <AuthLayout title="Create Your Account">
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;