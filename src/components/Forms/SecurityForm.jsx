import { yupResolver } from "@hookform/resolvers/yup";
import React, { memo } from 'react';
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import InputField from '../FormElements/InputField';
import SubmitButton from '../FormElements/SubmitButton';
import ErrorMessage from "../FormElements/error_message";

const Security = memo(({ title }) => {

    const validationSchema = Yup.object().shape({
        currentPass: Yup.string().required('Password is Required'),
        newPassword: Yup.string().required('Enter your new password').min(8, "Password must be at least 8 characters"),
        confirmPassword: Yup.string().required('Confirm Password').oneOf([Yup.ref("newPassword")], "Passwords must match")
    });

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange"
    });
    const onSubmit = (data) => {
        console.log("Form Data:", data);
    };

    return (
        <div className="w-full max-w-[400px]">
            <h1 className="text-2xl md:text-[30px] font-light font-oswald mb-6 md:mb-7 tracking-tight leading-none">
                {title}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <InputField type="password" icon="/assets/Password.png" placeholder="Current Password" {...register("currentPass")} />
                    <ErrorMessage message={errors.currentPass?.message} />
                </div>
                <div>
                    <InputField type="password" icon="/assets/Password.png" placeholder="New Password" {...register("newPassword")} />
                    <ErrorMessage message={errors.newPassword?.message} />
                </div>
                <div>
                    <InputField type="password" icon="/assets/Password.png" placeholder="Confirm Password" {...register("confirmPassword")} />
                    <ErrorMessage message={errors.confirmPassword?.message} />
                </div>

                <div className="pt-2">
                    <SubmitButton text="Save Changes" />
                </div>
            </form>
        </div>
    )
});

export default Security;