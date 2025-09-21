import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/FormElements/error_message';
import ResetPasswordForm from '../components/Forms/ResetPasswordForm';

const ChangePasswordPage = () => {

    const navigate = useNavigate()
    const [serverError, setServerError] = useState()
    const [isLoading, setIsLoading] = useState()

    async function changePass(data) {
        const url = 'http://127.0.0.1:8000/api/change-password'
        const token = localStorage.getItem("accessToken")
        try {
            setIsLoading(true);
            await axios.post(url, { password: data.password, password_confirmation: data.password_confirmation }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            console.log("Password changed successfully");
            setServerError(null)
            navigate("/passChanged")
        }
        catch (error) {
            if (error.response) {
                setServerError(error.response.data.message)
            }
            else {
                setServerError(error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (

        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-md space-y-4">
                <ResetPasswordForm title="Change Password:" buttonText={isLoading ? "Saving Changes..." : "Save Changes"} onSubmit={changePass} />
                {serverError && <ErrorMessage message={serverError} />}
            </div> </div >
    );
};

export default ChangePasswordPage;