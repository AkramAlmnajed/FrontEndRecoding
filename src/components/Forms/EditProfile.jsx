import { yupResolver } from "@hookform/resolvers/yup";
import { memo, useState } from 'react';
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useUser } from "../context/UserProvider";
import ErrorMessage from "../FormElements/error_message";
import InputField from '../FormElements/InputField';
import SubmitButton from '../FormElements/SubmitButton';


const EditProfile = memo(() => {

    const { updateProfile, user } = useUser()
    const [isLoading, setIsLoading] = useState(false)
    const [serverError, setServerError] = useState()

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Enter your name"),
    });
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange",
        defaultValues: {
            name: user?.name || ""
        }
    });

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            setServerError(null);
            const result = await updateProfile({ name: data.name }, user?.id);

            if (result.ok) {
                alert("Password Changed Successfully")
            } else {
                setServerError(result.error || 'Something went wrong. Please try again.');
            }
        } finally {
            setIsLoading(false)
        }
    };


    return (
        <div className="w-full max-w-[400px] ">
            <h1 className="text-[30px] font-light font-oswald mb-7 tracking-tight leading-none">
                Account Info:
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField icon="/assets/Name.png" placeholder="Full Name" {...register("name")} />
                <ErrorMessage message={errors.name?.message} />


                <SubmitButton text={isLoading ? "Saving Changes.." : "Save Changes"} />

            </form>
        </div>
    )
});

export default EditProfile;
