import { yupResolver } from "@hookform/resolvers/yup";
import { memo, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useVerification } from "../context/VerificationContext";
import ErrorMessage from "../FormElements/error_message";
import InputField from '../FormElements/InputField';
import SubmitButton from '../FormElements/SubmitButton';

const PasswordResetForm = memo(() => {

  const { forgotPass } = useVerification()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState()
  const [serverError, setServerError] = useState()

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required")
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });


  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      localStorage.setItem("forgotPassEmail", data.email);

      const result = await forgotPass(data.email);

      if (result.ok) {
        navigate('/verify');
      } else {
        console.error("Forgot password failed:", result.error);
        setServerError(result.error);
      }
    } catch (err) {
      console.error("Password reset error:", err);
      setServerError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 text-center text-gray-600 text-sm">
        Provide the email address associated with your account to recover your password
      </div>

      <InputField
        type="email"
        icon="/assets/Mail.png"
        placeholder="Email Address"
        {...register("email")}
      />
      <ErrorMessage message={serverError} />

      {errors.email?.message && <ErrorMessage message={errors.email.message} />}
      <SubmitButton text={isLoading? "Send Code": "Sending Code.."}/>

      <p className="text-center text-sm text-gray-600 mt-4">
        Remember your password?{" "}
        <a href="/login" className="hover:text-blue-800 border-b-2" aria-label="Login">
          Login now
        </a>
      </p>
    </form>)

});

export default PasswordResetForm;