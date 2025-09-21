import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import { useVerification } from "../components/context/VerificationContext";
import ErrorMessage from "../components/FormElements/error_message";
import VerificationForm from "../components/Forms/VerificationForm";

const VerifyRegisterPage = () => {

    const { resendCode, verify } = useVerification()
    const email = localStorage.getItem("RegisterEmail")
    const navigate = useNavigate()
    const [serverError, setServerError] = useState()

    async function submit(payload) {
        const result = await verify(email, payload.code)
        if (result.ok) {
            setServerError(null)
            navigate('/accountCreated');
        } else {
            console.log("Verification failed:", result.error);
            setServerError(result.error);
        }

    }

    async function resend() {
        const result = await resendCode(email)
        if (result.ok) {
            console.log("Code verified successfully");
        } else {
            console.log("Problem sending code:", result.error);
            setServerError(result.error);
        }
    }

    return (
        <AuthLayout title="Enter Verification Code">
            <VerificationForm onSubmit={submit} resend={resend} email={email} />
            <ErrorMessage message={serverError} />
        </AuthLayout>
    )
}
export default VerifyRegisterPage