import React, { memo } from 'react';
import InputField from '../FormElements/InputField';
import SubmitButton from '../FormElements/SubmitButton';

const RegisterForm = memo(() => (
  <>
    <InputField type="text" icon="/User.png" placeholder="Full Name" />
    <InputField type="email" icon="/Mail.png" placeholder="Email" />
    <InputField type="password" icon="/Password.png" placeholder="Password" />
    <InputField type="password" icon="/Password.png" placeholder="Confirm Password" />

    <div className="flex justify-between items-center mb-10 text-sm">
      <label className="flex items-center space-x-2">
        <input 
          type="checkbox" 
          className="w-4 h-4 border-gray-300 rounded" 
          aria-label="Terms and conditions"
        />
        <span className="text-gray-600">I agree to terms & conditions</span>
      </label>
    </div>

    <SubmitButton text="Register" />

    <p className="text-center text-sm text-gray-600">
      Already have an account?{" "}
      <a href="/login" className="hover:text-blue-800 border-b-2" aria-label="Login">
        Login now
      </a>
    </p>
  </>
));

export default RegisterForm;