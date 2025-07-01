import { yupResolver } from "@hookform/resolvers/yup";
import { memo, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import ErrorMessage from "../FormElements/error_message";
import InputField from '../FormElements/InputField';
import SubmitButton from '../FormElements/SubmitButton';

const RegisterForm = memo(() => {

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

      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "omit"
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Registration failed:", result);

        if (response.status === 422 && result.errors) {
          for (const key in result.errors) {
            if (Object.hasOwnProperty.call(result.errors, key)) {
              const formFieldName = key === 'name' ? 'fullName' : key === 'password_confirmation' ? 'confirmPassword' : key;

              setError(formFieldName, {
                type: "server",
                message: result.errors[key][0],
              });
            }
          }
          setApiError("Please correct the errors above.");
        } else {
          if (
            result.message?.includes("Volunteer data not found") ||
            result.message?.includes("Registration is not allowed")
          ) {
            setApiError(result.message);
          } else {
            setApiError(result.message || "Registration failed. Please try again.");
          }
        }
      } else {
        console.log("Registration successful:", result);
        navigate("/map");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      if (error instanceof TypeError && error.message === "Failed to fetch") {
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