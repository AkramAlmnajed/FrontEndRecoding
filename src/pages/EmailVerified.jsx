import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SuccessMessage from "../components/Forms/SuccessMessage";

const EmailVerified = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/changePass");
        }, 8000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md space-y-4">
                <SuccessMessage title={"Email Verified Successfully"} description={"Your new email has been verified. For security reasons you have to reset your password."} redirectText={"You'll be directed to the reset password page."} />

            </div> </div>
    )
}

export default EmailVerified