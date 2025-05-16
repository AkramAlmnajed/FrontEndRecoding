import { yupResolver } from "@hookform/resolvers/yup";
import React, { memo } from 'react';
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import InputField from '../FormElements/InputField';
import SubmitButton from '../FormElements/SubmitButton';
import ErrorMessage from "../FormElements/error_message";



const EditProfile = memo(({ title }) => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Enter your name"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().required("Password is required"),
    });
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange"
    });


    const onSubmit = (data) => {
        console.log("Form Data:", data);
    };

    return (
        <div className="w-full max-w-[400px] ">
            <h1 className="text-[30px] font-light font-oswald mb-7 tracking-tight leading-none">
                {title}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField icon="/assets/Name.png" placeholder="Full Name" {...register("name")} />
                <ErrorMessage message={errors.name?.message} />
                <InputField icon="/assets/Mail.png" placeholder="Email" {...register("email")} />
                <ErrorMessage message={errors.email?.message} />
                <InputField type="password" icon="/assets/Password.png" placeholder="Password"  {...register("password")} />
                <ErrorMessage message={errors.password?.message} />


                <SubmitButton text="Save Changes" />

            </form>
        </div>
    )
});

export default EditProfile;
