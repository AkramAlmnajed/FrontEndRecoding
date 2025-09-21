import axios from "axios";
import { createContext, useContext } from "react";

export const VerificationContext = createContext()

export const useVerification = () => useContext(VerificationContext);


export const VerificationProvider = ({ children }) => {

    async function forgotPass(email) {
        const url = "http://127.0.0.1:8000/api/forgot-password";

        try {
            const response = await axios.post(url, { email });
            console.log("code sent successfully");
            return { ok: true, data: response.data };
        } catch (error) {
            if (error.response && error.response.data?.message) {
                console.log(error.response.data.message);
                return { ok: false, error: error.response.data.message };
            } else {
                console.log("Error", error.message);
                return { ok: false, error: error.message };
            }
        }
    }

    async function verify(email, code) {
        const url = "http://127.0.0.1:8000/api/verify-code";

        const formData = new FormData();
        formData.append("email", email);
        formData.append("verification_code", code);

        try {
            const response = await axios.post(url, formData);
            console.log("code sent successfully", response.data);
            return { ok: true, data: response.data };
        } catch (error) {
            if (error.response && error.response.data?.message) {
                console.log(error.response.data.message);
                return { ok: false, error: error.response.data.message };

            } else {
                console.log("Error", error.message);
                return { ok: false, error: error.message };
            }
        }
    }

    async function resendCode(email) {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/resend-code", {
                "email": email,
            });

            console.log("Success:", response.data);
            return { ok: true, data: response.data };

        } catch (error) {
            if (error.response && error.response.data?.message) {
                console.log(error.response.data.message)
                return { ok: false, error: error.response.data.message };
            } else {
                console.log("Error", error.message)
                return { ok: false, error: error.message };
            }
        }
    }

    return (
        <VerificationContext.Provider
            value={{
                forgotPass,
                verify,
                resendCode,
            }}
        >
            {children}
        </VerificationContext.Provider>
    );

}
