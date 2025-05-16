import React, { memo } from 'react';
import InputField from '../FormElements/InputField';
import SubmitButton from '../FormElements/SubmitButton';

const VerificationForm = memo(() => (
  <>
    <InputField 
      type="text" 
      icon="/assets/VerificationCode.png"  // Make sure to add this icon
      placeholder="Confirmation Code" 
    />

    <SubmitButton text="Confirm" />

    <p className="text-center text-sm text-gray-600 mt-4">
      Didn't receive a code?{" "}
      <a href="#" className="hover:text-blue-800 border-b-2" aria-label="Resend code">
        Resend code
      </a>
    </p>
  </>
));

export default VerificationForm;