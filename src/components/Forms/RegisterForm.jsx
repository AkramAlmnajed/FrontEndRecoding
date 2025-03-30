import { yupResolver } from "@hookform/resolvers/yup";
import React, { memo } from 'react';
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import InputField from '../FormElements/InputField';
import SubmitButton from '../FormElements/SubmitButton';
import ErrorMessage from "../FormElements/error_message";

const RegisterForm = memo(() => {

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().min(6, "The name must be at least 6 characters").required("Full Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    terms: Yup.boolean().oneOf([true], "You must agree to the terms & conditions"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField type="text" icon="/assets/User.png" placeholder="Full Name" {...register("fullName")} />
      <ErrorMessage message={errors.fullName?.message} />
      <InputField type="email" icon="/assets/Mail.png" placeholder="Email" {...register("email")} />
      <ErrorMessage message={errors.email?.message} />
      <InputField type="password" icon="/assets/Password.png" placeholder="Password" {...register("password")} />
      <ErrorMessage message={errors.password?.message} />
      <InputField type="password" icon="/assets/Password.png" placeholder="Confirm Password" {...register("confirmPassword")} />
      <ErrorMessage message={errors.confirmPassword?.message} />

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
    </form>
  )
});

export default RegisterForm;