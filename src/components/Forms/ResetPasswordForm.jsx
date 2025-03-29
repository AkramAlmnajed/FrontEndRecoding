import React, { memo } from 'react';
import InputField from '../FormElements/InputField';
import SubmitButton from '../FormElements/SubmitButton';

const ResetPasswordForm = memo(() => (
  <>
    <InputField type="password" icon="/Password.png" placeholder="New Password" />
    <InputField type="password" icon="/Password.png" placeholder="Confirm New Password" />

    <SubmitButton text="Reset my Password" />

    <p className="text-center text-sm text-gray-600 mt-4">
      Remember your password?{" "}
      <a href="/login" className="hover:text-blue-800 border-b-2" aria-label="Login">
        Login now
      </a>
    </p>
  </>
));

export default ResetPasswordForm;