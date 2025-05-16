import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import PositionForm from '../components/Forms/PositionForm';

const PositionPage = () => {
  return (
    <AuthLayout>
      <PositionForm buttonText="Complete the registration"
        title="Specify Your Position"
        onSubmit={(data) => {
          console.log("Saving changes:", data);
        }} />
    </AuthLayout>
  );
};

export default PositionPage;