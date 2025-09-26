import { createContext, useCallback, useContext, useState } from "react";
import api from "../api/axios";

const AspectDataContext = createContext();

export const useAspectData = () => useContext(AspectDataContext);

export const AspectDataProvider = ({ children }) => {
    const token = localStorage.getItem("accessToken");
    const [aspects, setAspects] = useState([]);
    const [subAspects, setSubAspects] = useState({});
    const [categories, setCategories] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all aspects
    const fetchAspects = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get("aspects", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                }
            });
            setAspects(response.data);
        } catch (err) {
            setError("Failed to load aspects.");
        } finally {
            setLoading(false);
        }
    }, [token]);

    // Fetch sub-aspects for a specific aspect
    const fetchSubAspects = async (aspectId) => {
        if (subAspects[aspectId]) return;

        try {
            const response = await api.get(`sub-aspects/${aspectId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                }
            });
            setSubAspects((prev) => ({ ...prev, [aspectId]: response.data }));
        } catch (err) {
            setError(`Failed to load sub-aspects for aspect ${aspectId}`);
        }
    };

    // Fetch categories for a specific sub-aspect
    const fetchCategories = async (subAspectId) => {
        if (categories[subAspectId]) return;

        try {
            const response = await api.get(`categories/${subAspectId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                }
            });

            setCategories((prev) => ({ ...prev, [subAspectId]: response.data }));
        } catch (err) {
            setError(`Failed to load categories for sub-aspect ${subAspectId}`);
        }
    };

    return (
        <AspectDataContext.Provider
            value={{
                aspects,
                subAspects,
                categories,
                fetchAspects,
                fetchSubAspects,
                fetchCategories,
                loading,
                error,
            }}
        >
            {children}
        </AspectDataContext.Provider>
    );
};
