import { yupResolver } from "@hookform/resolvers/yup";
<<<<<<< Updated upstream
import { memo, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
=======
import { memo } from 'react';
import { useForm } from "react-hook-form";
>>>>>>> Stashed changes
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { useUser } from "../context/UserProvider";
import ErrorMessage from "../FormElements/error_message";
import InputField from '../FormElements/InputField';
import SubmitButton from '../FormElements/SubmitButton';

const RegisterForm = memo(() => {
<<<<<<< Updated upstream
    const { setLayer, setEmail, setName, setPassword } = useUser();
    const [apiError, setApiError] = useState(""); 
    const [isLoading, setIsLoading] = useState(false); 

    const validationSchema = Yup.object().shape({
        fullName: Yup.string()
            .min(6, "Full Name must be at least 6 characters.")
            .required("Full Name is required."),
        email: Yup.string()
            .email("Invalid email format.")
            .required("Email is required."),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters.")
            .required("Password is required."),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match.")
            .required("Confirm Password is required."),
        terms: Yup.boolean()
            .oneOf([true], "You must agree to the terms and conditions to proceed."),
        layer: Yup.string()
            .required('Layer is required.'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setError,
        clearErrors
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange",
    });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setIsLoading(true);
        setApiError("");
        clearErrors(); 
=======
  const { setEmail, setName, setPassword } = useUser();
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
    formState: { errors },
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
      };
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
            const result = await response.json();

            if (!response.ok) {
                console.error("Registration failed:", result);

                if (response.status === 422 && result.errors) {
                    for (const key in result.errors) {
                        if (Object.hasOwnProperty.call(result.errors, key)) {
                            const formFieldName = key === 'name' ? 'fullName' : key === 'password_confirmation' ? 'confirmPassword' : key;
                            setError(formFieldName, { type: 'server', message: result.errors[key][0] });
                        }
                    }
                    setApiError("Please correct the errors indicated above.");
                } else {
                    if (result.message && result.message.includes("Volunteer data not found") || result.message.includes("Registration is not allowed")) {
                        setError("layer", { type: 'server', message: result.message });
                    } else {
                        setApiError(result.message || "Registration failed. Please check your inputs and try again.");
                    }
                }
            } else {
                setName(data.fullName);
                setEmail(data.email);
                setLayer(data.layer);
                setPassword(data.password);
                console.log("Registration successful:", result);
                alert("Registration successful!");
                navigate("/map");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            if (error instanceof TypeError && error.message === 'Failed to fetch') {
                setApiError("Cannot connect to the server. Please check your internet connection and try again.");
            } else {
                setApiError("An unexpected error occurred. Please try again later.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const layers = [
        { value: '', label: 'Select Layer' },
        { value: 'public health', label: 'Public Health' },
        { value: 'resources management', label: 'Resources Management' },
        { value: 'economic factor', label: 'Economic Factor' },
        { value: 'ecological factor', label: 'Ecological Factor' },
        { value: 'urban planning', label: 'Urban Planning' },
        { value: 'social factor', label: 'Social Factor' },
        { value: 'building code', label: 'Building Code' },
        { value: 'Culture and heritage', label: 'Culture and Heritage' },
        { value: 'data collection and analysis', label: 'Data Collection and Analysis' },
        { value: 'technology and infrastructure', label: 'Technology and Infrastructure' }
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {apiError && !errors.layer?.message && <ErrorMessage message={apiError} className="mb-4 text-center" />}
=======
      if (!response.ok) {
        console.error("Registration failed:", result);
        alert(result.message || "Registration failed. Please check your inputs.");
      } else {
        setName(data.fullName);
        setEmail(data.email);
        setPassword(data.password)
        console.log("Registration successful:", result);
        alert("Registration successful!");
        navigate("/map");
      }
      if (result.access_token) {
        localStorage.setItem("accessToken", result.access_token);
      } else {
        console.error("No token found in login response.");
        alert("Regestration succeeded but no token was returned.");
        console.log("Full login response:", result);

        return;
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
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
>>>>>>> Stashed changes

            <InputField
                type="text"
                icon="/assets/User.png"
                placeholder="Full Name"
                {...register("fullName", {
                    onChange: () => clearErrors("fullName")
                })}
            />
            <ErrorMessage message={errors.fullName?.message} />

            <InputField
                type="email"
                icon="/assets/Mail.png"
                placeholder="Email"
                {...register("email", {
                    onChange: () => clearErrors("email")
                })}
            />
            <ErrorMessage message={errors.email?.message} />

            <InputField
                type="password"
                icon="/assets/Password.png"
                placeholder="Password"
                {...register("password", {
                    onChange: () => clearErrors("password")
                })}
            />
            <ErrorMessage message={errors.password?.message} />

            <InputField
                type="password"
                icon="/assets/Password.png"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                    onChange: () => clearErrors("confirmPassword")
                })}
            />
            <ErrorMessage message={errors.confirmPassword?.message} />

            <div className="mb-10">
                <div className="flex items-center border-b border-gray-300 pb-2">
                    <img
                        src="/assets/DropDown.png"
                        className="h-8 w-8 mr-3 opacity-40"
                        alt="Layer"
                        loading="lazy"
                    />
                    <Controller
                        name="layer"
                        control={control}
                        render={({ field }) => (
                            <select
                                {...field}
                                className="w-full bg-transparent focus:outline-none text-lg appearance-none"
                                onChange={(e) => {
                                    field.onChange(e);
                                    clearErrors("layer"); 
                                }}
                            >
                                {layers.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                </div>
                <ErrorMessage message={errors.layer?.message} />
            </div>

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