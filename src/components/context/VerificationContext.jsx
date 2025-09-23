import { createContext, useContext } from "react";
import api from "../api/axios";

export const VerificationContext = createContext()

export const useVerification = () => useContext(VerificationContext);


export const VerificationProvider = ({ children }) => {

    async function forgotPass(email) {

        try {
            const response = await api.post("forgot-password", { email });
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
        const formData = new FormData();
        formData.append("email", email);
        formData.append("verification_code", code);

        try {
            const response = await api.post("verify-code", formData);
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
            const response = await api.post("resend-code", {
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
