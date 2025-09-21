import { yupResolver } from "@hookform/resolvers/yup";
import { memo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import InputField from "../FormElements/InputField";
import SubmitButton from "../FormElements/SubmitButton";
import ErrorMessage from "../FormElements/error_message";

const ResetPassword = memo(({
  onSubmit,
  title,
  buttonText,
  extraContent,
  showCurrentPassword = false
}) => {
  const validationSchema = Yup.object().shape({
    ...(showCurrentPassword && {
      current_password: Yup.string()
        .required("Current password is required"),
    }),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    password_confirmation: Yup.string()
      .required("Confirm Password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  return (
    <div className="w-full max-w-[400px]">
      {title && (
        <h1 className="text-2xl md:text-[30px] font-light font-oswald mb-6 md:mb-7 tracking-tight leading-none">
          {title}
        </h1>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {showCurrentPassword && (
          <div>
            <InputField
              type="password"
              icon="/assets/Password.png"
              placeholder="Current Password"
              {...register("current_password")}
            />
            <ErrorMessage message={errors.currentPassword?.message} />
          </div>
        )}
        <div>
          <InputField
            type="password"
            icon="/assets/Password.png"
            placeholder="New Password"
            {...register("password")}
          />
          <ErrorMessage message={errors.password?.message} />
        </div>
        <div>
          <InputField
            type="password"
            icon="/assets/Password.png"
            placeholder="Confirm Password"
            {...register("password_confirmation")}
          />
          <ErrorMessage message={errors.confirmPassword?.message} />
        </div>

        <div className="pt-2">
          <SubmitButton text={buttonText} />
        </div>

        {extraContent && <div className="mt-4">{extraContent}</div>}
      </form>
    </div>
  );
});

export default ResetPassword;
