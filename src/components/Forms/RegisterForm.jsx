import { yupResolver } from "@hookform/resolvers/yup";
import { memo, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import api from "../api/axios";
import { useVerification } from "../context/VerificationContext";
import ErrorMessage from "../FormElements/error_message";
import InputField from '../FormElements/InputField';
import SubmitButton from '../FormElements/SubmitButton';

const RegisterForm = memo(() => {
  const { resendCode } = useVerification()
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().min(6, "The name must be at least 6 characters").required("Full Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password"),
    terms: Yup.boolean().oneOf([true], "*"),

  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setApiError("");
      clearErrors();

      const payload = {
        name: data.fullName,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      };
      localStorage.setItem("RegisterEmail", data.email);

      const response = await api.post("register", payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const result = response.data;
      console.log("Registration successful:", result);

      await resendCode(data.email);
      navigate("/verifyRegister");
    } catch (error) {
      console.error("Error during registration:", error);

      if (error.response) {
        const { status, data: errData } = error.response;

        if (status === 422 && errData.errors) {
          for (const key in errData.errors) {
            if (Object.hasOwnProperty.call(errData.errors, key)) {
              const formFieldName =
                key === "name"
                  ? "fullName"
                  : key === "password_confirmation"
                    ? "confirmPassword"
                    : key;

              setError(formFieldName, {
                type: "server",
                message: errData.errors[key][0],
              });
            }
          }
          setApiError("Please correct the errors above.");
        } else {
          if (
            errData.message?.includes("Volunteer data not found") ||
            errData.message?.includes("Registration is not allowed")
          ) {
            setApiError(errData.message);
          } else {
            setApiError(errData.message || "Registration failed. Please try again.");
          }
        }
      } else if (error.request) {
        setApiError("Cannot connect to the server. Please check your internet connection.");
      } else {
        setApiError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };





  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField type="text" icon="/assets/User.png" placeholder="Full Name" {...register("fullName")} />
      <ErrorMessage message={errors.fullName?.message} />
      <InputField type="email" icon="/assets/Mail.png" placeholder="Email" {...register("email")} />
      <ErrorMessage message={errors.email?.message} />
      <InputField type="password" icon="/assets/Password.png" placeholder="Password" {...register("password")} password/>
      <ErrorMessage message={errors.password?.message} />
      <InputField type="password" icon="/assets/Password.png" placeholder="Confirm Password" {...register("confirmPassword")} password/>
      <ErrorMessage message={errors.confirmPassword?.message} />

      <div className="flex justify-between items-center mb-10 text-sm">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="w-4 h-4 border-gray-300 rounded"
            aria-label="Terms and conditions"
            {...register('terms', {
              onChange: () => clearErrors("terms")
            })}
          />
          <span className="text-gray-600">I agree to terms & conditions</span>
        </label>
      </div>
      <ErrorMessage message={errors.terms?.message} />

      {apiError && (
        <ErrorMessage message={apiError} />
      )}

      <SubmitButton text={isLoading ? "Registering..." : "Register"} disabled={isLoading} />

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