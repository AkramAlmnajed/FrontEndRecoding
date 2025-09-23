import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import ErrorMessage from '../FormElements/error_message';
import InputField from '../FormElements/InputField';
import SubmitButton from '../FormElements/SubmitButton';
import api from "../api/axios"

const ChangeEmail = memo(() => {

    const [serverError, setServerError] = useState()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const validationSchema = Yup.object().shape({
        currentPass: Yup.string().required("Enter your name"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
    });
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange"
    });
    const onSubmit = (data) => {
        localStorage.setItem("newEmail", data.email);
        changeEm(data);
    };

    const token = localStorage.getItem('accessToken')


    async function changeEm(data) {
        setIsLoading(true);
        try {
            const response = await api.post( 'change-email', {
                new_email: data.email,
                current_password: data.currentPass
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            console.log("API Response:", response.data)
            setServerError(null);
            navigate('/verifyNewEmail')
        }
        catch (error) {
            if (error.response) {
                console.log("API Error:", error.response.data);

                let msg = error.response.data.message;

                if (msg.includes("email limit is reached")) {
                    setServerError("Email quota reached. Please try again later.");
                } else {
                    setServerError("Something went wrong. Please try again.");
                }

            } else {
                console.log("Error:", error.message);
                setServerError("Network error. Please check your connection.");
            }
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div className="w-full max-w-[400px]">
            <h1 className="text-2xl md:text-[30px] font-light font-oswald mb-6 md:mb-7 tracking-tight leading-none">
                Change Email:
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <InputField icon="/assets/Mail.png" placeholder="Email" {...register("email")} />
                    <ErrorMessage message={errors.email?.message} />
                </div>
                <div>
                    <InputField type="password" icon="/assets/Password.png" placeholder="Current Password" {...register("currentPass")} />
                    <ErrorMessage message={errors.currentPass?.message} />
                </div>
                {serverError && (
                    <ErrorMessage message={serverError} />
                )}
                <div className="pt-2">
                    <SubmitButton text={isLoading ? "Submitting..." : "Submit"} />
                </div>
            </form>
        </div>

    )
}
)
export default ChangeEmail