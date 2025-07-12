import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../FormElements/InputField";
import SubmitButton from "../FormElements/SubmitButton";
import ErrorMessage from "../FormElements/error_message";

const LoginForm = memo(() => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        const serverMsg = result.message || "Login failed";
        setError("root.serverError", { type: "server", message: serverMsg });
        return;
      }

      if (result.access_token) {
        localStorage.setItem("accessToken", result.access_token);
        navigate("/map");
      } else {
        setError("root.serverError", {
          type: "server",
          message: "Login successful but no token returned!"
        });
      }
    } catch (error) {
      setError("root.serverError", {
        type: "server",
        message: error.message || "Network error"
      });
    }
  };

 return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField icon="/assets/Mail.png" placeholder="Email" {...register("email")} />
      <ErrorMessage message={errors.email?.message} />

      <InputField type="password" icon="/assets/Password.png" placeholder="Password" {...register("password")} />
      <ErrorMessage message={errors.password?.message} />

      {errors.root?.serverError && (
        <div className="text-red-600 text-center">
          {errors.root.serverError.message}
        </div>
      )}

      {/* Responsive layout here */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 text-sm gap-2">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-gray-600">Remember me?</span>
        </label>
        <Link to="/resetPass" className="text-gray-600 hover:text-blue-800">
          Forgot Password?
        </Link>
      </div>

      <SubmitButton text="Login" type="submit" disabled={isSubmitting} />

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="hover:text-blue-800 border-b-2">
          Create a new account now
        </Link>
      </p>
    </form>
  );
});

export default LoginForm;