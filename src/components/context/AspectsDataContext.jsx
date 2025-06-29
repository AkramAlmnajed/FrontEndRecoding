import axios from "axios";
import { createContext, useCallback, useContext, useState } from "react";

// Create the context
const AspectDataContext = createContext();

export const useAspectData = () => useContext(AspectDataContext);

// Provider component
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
            console.log("fetching aspects")
            setLoading(true);
            const response = await axios.get("http://127.0.0.1:8000/api/aspects", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                }
            });
            console.log("Aspects response:", response.data)
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
            console.log("fetching SubAspects")
            const response = await axios.get(`http://127.0.0.1:8000/api/sub-aspects/${aspectId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                }
            });
            console.log("response", response.data)
            setSubAspects((prev) => ({ ...prev, [aspectId]: response.data }));
        } catch (err) {
            setError(`Failed to load sub-aspects for aspect ${aspectId}`);
        }
    };

    // Fetch categories for a specific sub-aspect
    const fetchCategories = async (subAspectId) => {
        if (categories[subAspectId]) return;

        try {
            console.log("fetching Categories")
            const response = await axios.get(`http://127.0.0.1:8000/api/categories/${subAspectId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                }
            });
            console.log("categories:", response.data)

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
