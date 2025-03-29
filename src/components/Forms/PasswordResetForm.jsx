import React, { memo } from 'react';
import InputField from '../FormElements/InputField';
import SubmitButton from '../FormElements/SubmitButton';

const PasswordResetForm = memo(() => (
    

    
  <>
    <div className="mb-6 text-center text-gray-600 text-sm">
   Provide the email address associated with your account to recover your password
    </div>

    <InputField 
      type="email" 
      icon="/Mail.png" 
      placeholder="Email Address" 
    />

    <SubmitButton text="Reset My Password" />

    <p className="text-center text-sm text-gray-600 mt-4">
      Remember your password?{" "}
      <a href="/login" className="hover:text-blue-800 border-b-2" aria-label="Login">
        Login now
      </a>
    </p>
  </>
));

export default PasswordResetForm;