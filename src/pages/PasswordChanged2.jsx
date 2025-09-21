import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessMessage from '../components/Forms/SuccessMessage';
import { useUser } from '../components/context/UserProvider';

const PasswordChanged2 = () => {

    const navigate = useNavigate()
    const { fetchUser } = useUser()
    useEffect(() => {
        async function handleRedirect() {
            try {
                await fetchUser();
            } catch (err) {
                console.error("Failed to refresh user:", err);
            } finally {
                setTimeout(() => {
                    navigate("/settings");
                }, 5000);
            }
        }

        handleRedirect();
    }, [fetchUser, navigate]);

    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md space-y-4">
                <SuccessMessage
                    title="Password Changed!"
                    description="Your password has been changed successfully!"
                    redirectText="You'll be directed to the settings page."
                />
            </div> </div>
    );
};

export default PasswordChanged2;