import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVerification } from "../components/context/VerificationContext";
import ErrorMessage from "../components/FormElements/error_message";
import VerificationForm from "../components/Forms/VerificationForm";

const VerifyEmailPage = () => {

    const { resendCode, verify } = useVerification()
    const email = localStorage.getItem("newEmail")
    const navigate = useNavigate()
    const [serverError, setServerError] = useState()

    async function submit(payload) {
        const result = await verify(email, payload.code)
        if (result.ok) {
            setServerError(null)
            navigate('/emailVerify');
        } else {
            console.log("Verification failed:", result.error);
            setServerError(result.error);
        }

    }

    async function resend() {
        const result = await resendCode(email)
        if (result.ok) {
            console.log("Code sent successfully");
        } else {
            console.log("Problem sending code:", result.error);
            setServerError(result.error);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md space-y-4">
                <VerificationForm onSubmit={submit} resend={resend} email={email} title="Enter Verification Code" />
                <ErrorMessage message={serverError} />
            </div> </div>)
}

export default VerifyEmailPage