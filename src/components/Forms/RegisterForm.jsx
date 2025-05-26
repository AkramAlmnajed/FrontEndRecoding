import { yupResolver } from "@hookform/resolvers/yup";
import { memo } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { useUser } from "../context/UserProvider";
import ErrorMessage from "../FormElements/error_message";
import InputField from '../FormElements/InputField';
import SubmitButton from '../FormElements/SubmitButton';

const RegisterForm = memo(() => {
  const { setLayer, setEmail, setName, setPassword } = useUser();

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().min(6, "The name must be at least 6 characters").required("Full Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password"),
    terms: Yup.boolean().oneOf([true], "*"),
    layer: Yup.string().required('*'),

  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control

  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.fullName,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
        layer: data.layer
      };

      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "omit"
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Registration failed:", result);
        alert(result.message || "Registration failed. Please check your inputs.");
      } else {
        setName(data.fullName);
        setEmail(data.email);
        setLayer(data.layer);
        setPassword(data.password)
        console.log("Registration successful:", result);
        alert("Registration successful!");
        navigate("/map");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const layers = [
    { value: '', label: 'Select Layer' },
    { value: 'public health', label: 'public health' },
    { value: 'resources management', label: 'resources management' },
    { value: 'economic factor', label: 'economic factor' },
    { value: 'ecological factor', label: 'ecological factor' }
    , { value: 'urban planning', label: 'urban planning' }
    , { value: 'social factor', label: 'social factor' }
    , { value: 'building code', label: 'building code' }
    , { value: 'Culture and heritage', label: 'Culture and heritage' }
    , { value: 'data collection and analysis', label: 'data collection and analysis' }
    , { value: 'technology and infrastructure', label: 'technology and infrastructure' }


  ];

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
      <div className="mb-10">
        <div className="flex items-center border-b border-gray-300 pb-2">
          <img
            src="/assets/DropDown.png"  // Add your layer icon
            className="h-8 w-8 mr-3 opacity-40"
            alt="Layer"
            loading="lazy"
          />
          <Controller
            name="layer"
            control={control}
            render={({ field }) => (
              <select {...field} className="w-full bg-transparent focus:outline-none text-lg appearance-none">
                {layers.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          />
          <ErrorMessage message={errors.layer?.message} />
        </div>
      </div>

      <div className="flex justify-between items-center mb-10 text-sm">
        <label className="flex items-center space-x-2">
          <ErrorMessage message={errors.terms?.message} />
          <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" aria-label="Terms and conditions" {...register('terms')} />
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