import { yupResolver } from "@hookform/resolvers/yup";
import React, { memo } from 'react';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"; 
import * as Yup from "yup";
import InputField from '../FormElements/InputField';
import SubmitButton from '../FormElements/SubmitButton';
import ErrorMessage from "../FormElements/error_message";

const LoginForm = memo(() => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange"
  });

  const onSubmit = (data) => {
    console.log("Form Submitted!");
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField type='email' icon="/assets/Mail.png" placeholder="Email" {...register("email")} />
      <ErrorMessage message={errors.email?.message} />
      <InputField type="password" icon="/assets/Password.png" placeholder="Password"  {...register("password")} />
      <ErrorMessage message={errors.password?.message} />

      <div className="flex justify-between items-center mb-10 text-sm">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="w-4 h-4 border-gray-300 rounded"
            aria-label="Remember me"
          />
          <span className="text-gray-600">Remember me?</span>
        </label>
        <Link to="/resetPass" className="text-gray-600 hover:text-blue-800" aria-label="Forgot password">
          Forgot Password?
        </Link>
      </div>

      <SubmitButton text="Login" />

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="hover:text-blue-800 border-b-2" aria-label="Create new account">
          Create a new account now
        </Link>
      </p>
    </form>
  )
});

export default LoginForm;