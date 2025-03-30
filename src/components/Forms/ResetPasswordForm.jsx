import { yupResolver } from "@hookform/resolvers/yup";
import React, { memo } from 'react';
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import InputField from '../FormElements/InputField';
import SubmitButton from '../FormElements/SubmitButton';
import ErrorMessage from "../FormElements/error_message";


const ResetPasswordForm = memo(() => {

  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Password is Required').min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required('Confirm Password'),
  });

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange"
  });
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField type="password" icon="/assets/Password.png" placeholder="New Password" {...register("password")} />
      <ErrorMessage message={errors.password?.message} />
      <InputField type="password" icon="/assets/Password.png" placeholder="Confirm New Password" {...register("confirmPassword")} />
      <ErrorMessage message={errors.confirmPassword?.message} />

      <SubmitButton text="Reset my Password" />

      <p className="text-center text-sm text-gray-600 mt-4">
        Remember your password?{" "}
        <a href="/login" className="hover:text-blue-800 border-b-2" aria-label="Login">
          Login now
        </a>
      </p>
    </form>
  )
});

export default ResetPasswordForm;