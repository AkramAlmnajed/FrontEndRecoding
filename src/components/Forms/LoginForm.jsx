import { yupResolver } from "@hookform/resolvers/yup";
import { memo } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import InputField from '../FormElements/InputField';
import SubmitButton from '../FormElements/SubmitButton';
import ErrorMessage from "../FormElements/error_message";





const LoginForm = memo(() => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });
  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange"
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Login failed:", result);
        alert(result.message || "Login failed. Please check your credentials.");
        return;
      }
      if (result.access_token) {
        localStorage.setItem("accessToken", result.access_token);
      } else {
        console.error("No token found in login response.");
        alert("Login succeeded but no token was returned.");
        console.log("Full login response:", result);

        return;
      }

      console.log("Login successful:", result);



      navigate('/map');
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField icon="/assets/Mail.png" placeholder="Email" {...register("email")} />
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
