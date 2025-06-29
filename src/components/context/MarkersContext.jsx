import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const MarkerContext = createContext();

export const useMarkers = () => useContext(MarkerContext);

export const MarkerProvider = ({ children }) => {
    const [allMarkers, setAllMarkers] = useState([]);
    const [searchQuery, setSearchQuery] = useState(null);
    const [filterQuery, setFilterQuery] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [filterResults, setFilterResults] = useState([]);
    const token = localStorage.getItem("accessToken");


    //fetch markers
    const fetchMarkers = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/locations", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            setAllMarkers(res.data);
        } catch (err) {
            console.error("Error loading default markers:", err);
        }
    };

    // Run on mount to load markers initially
    useEffect(() => {
        fetchMarkers();
    }, []);


    // Fetch when search query changes
    useEffect(() => {
        if (!searchQuery) return;
        const fetchMarkers = async () => {
            try {
                const response = await axios.get("//127.0.0.1:8000/api/locations/search", {
                    params: {
                        name: searchQuery.name
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                });
                setSearchResults(response.data.locations || []);
                setFilterResults([]);
            } catch (error) {
                console.error("Error fetching markers:", error);
            }
        };

        fetchMarkers();
    }, [searchQuery]);


    // Fetch when filter query changes
    useEffect(() => {
        if (!filterQuery) return;

        const fetchFilteredMarkers = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/locations/filter",
                    {
                        params: filterQuery,
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );

                setFilterResults(response.data || []);
                setSearchResults([]);
            } catch (error) {
                console.error("Error fetching filtered markers:", error);
            }
        };

        fetchFilteredMarkers();
    }, [filterQuery]);


    //get a specific marker
    const fetchSpecificMarker = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/locations/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching marker by ID:", error);
            return null;
        }
    };


    //delete marker
    const deleteMarker = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/locations/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("deleted")
            alert("Marker deleted!");
            await fetchMarkers();
        } catch (error) {
            console.error("Error deleting marker:", error);
        }
    };

    return (
        <MarkerContext.Provider
            value={{
                setSearchQuery,
                setFilterQuery,
                searchResults,
                filterResults,
                allMarkers,
                setAllMarkers,
                fetchMarkers,
                fetchSpecificMarker,
                deleteMarker
            }}
        >
            {children}
        </MarkerContext.Provider>
    );
};
