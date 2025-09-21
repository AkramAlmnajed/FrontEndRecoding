import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as Yup from "yup"
import InputField from "../FormElements/InputField"
import SubmitButton from "../FormElements/SubmitButton"
import ErrorMessage from "../FormElements/error_message"

const VerificationForm = ({ onSubmit, resend, email, title }) => {

  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .required("Code is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const handleFormSubmit = (data) => {
    const payload = { ...data, email };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {title && (
        <h1 className="text-center text-2xl md:text-[30px] font-light font-oswald mb-6 md:mb-7 tracking-tight leading-none">
          {title}
        </h1>
      )
      }
      <div className="mb-6 text-center text-gray-600 text-sm">
        To verify your account enter the code we sent to your email  </div>

      <InputField
        icon="/assets/Password.png"
        placeholder="Confirmation Code"
        {...register("code")}
      />

      {errors.code?.message && <ErrorMessage message={errors.email.message} />}

      <SubmitButton text="Confirm" />
      <p className="text-center text-sm text-gray-600">
        Didn't receive the code?{" "}
        <button
          type="button"
          onClick={resend}
          className="hover:text-blue-800 border-b-2 text-blue-600"
        >
          Resend code
        </button>
      </p>

    </form >)
}
export default VerificationForm