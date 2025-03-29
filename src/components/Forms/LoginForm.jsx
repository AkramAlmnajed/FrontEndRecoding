import React, { memo } from 'react';
import InputField from '../FormElements/InputField';
import SubmitButton from '../FormElements/SubmitButton';

const LoginForm = memo(() => (
  <>
    <InputField type="email" icon="/Mail.png" placeholder="Email" />
    <InputField type="password" icon="/Password.png" placeholder="Password" />

    <div className="flex justify-between items-center mb-10 text-sm">
      <label className="flex items-center space-x-2">
        <input 
          type="checkbox" 
          className="w-4 h-4 border-gray-300 rounded" 
          aria-label="Remember me"
        />
        <span className="text-gray-600">Remember me?</span>
      </label>
      <a href="/reset-password" className="text-gray-600 hover:text-blue-800" aria-label="Forgot password">
        Forgot Password?
      </a>
    </div>

    <SubmitButton text="Login" />

    <p className="text-center text-sm text-gray-600">
      Don't have an account?{" "}
      <a href="/register" className="hover:text-blue-800 border-b-2" aria-label="Create new account">
        Create a new account now
      </a>
    </p>
  </>
));

export default LoginForm;