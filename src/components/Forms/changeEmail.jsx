import { yupResolver } from '@hookform/resolvers/yup';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import ErrorMessage from '../FormElements/error_message';
import InputField from '../FormElements/InputField';
import SubmitButton from '../FormElements/SubmitButton';

const ChangeEmail = memo(() => {

    const validationSchema = Yup.object().shape({
        currentPass: Yup.string().required("Enter your name"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
    });
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange"
    });
    const onSubmit = (data) => {
        console.log("Form data:", data);
    };

    return (
        <div className="w-full max-w-[400px]">
            <h1 className="text-2xl md:text-[30px] font-light font-oswald mb-6 md:mb-7 tracking-tight leading-none">
                Change Email:
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <InputField type="password" icon="/assets/Password.png" placeholder="Current Password" {...register("currentPass")} />
                    <ErrorMessage message={errors.currentPass?.message} />
                </div>

                <div>
                    <InputField icon="/assets/Mail.png" placeholder="Email" {...register("email")} />
                    <ErrorMessage message={errors.email?.message} />
                </div>

                <div className="pt-2">
                    <SubmitButton text="Submit" />
                </div>
            </form>
        </div>

    )
})
export default ChangeEmail