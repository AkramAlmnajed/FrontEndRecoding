import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/Forms/LoginForm';

const LoginPage = () => {
  return (
    <AuthLayout title="Welcome Back!">
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;