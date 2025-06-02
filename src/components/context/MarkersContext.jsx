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
    useEffect(() => {
        const fetchMarkers = async () => {
            try {
                console.log("Using token:", token);
                console.log("Request headers:", {
                    Authorization: `Bearer ${token}`,
                });

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

        fetchMarkers();
    }, []);


    // Fetch when search query changes
    useEffect(() => {
        if (!searchQuery) return;
        console.log("Search query changed:", searchQuery);
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

                console.log("API response for search:", response.data);
                setSearchResults(response.data.locations || []);
            } catch (error) {
                console.error("Error fetching markers:", error);
            }
        };

        fetchMarkers();
    }, [searchQuery]);


    // Fetch when filter query changes
    // useEffect(() => {
    //     if (!filterQuery) return;
    //     fetch(`/api/filter-markers?${new URLSearchParams(filterQuery)}`)
    //         .then(res => res.json())
    //         .then(data => setFilterResults(data))
    //         .catch(console.error);
    // }, [filterQuery]);


    return (
        <MarkerContext.Provider
            value={{
                setSearchQuery,
                setFilterQuery,
                searchResults,
                filterResults,
                allMarkers,
                setAllMarkers
            }}
        >
            {children}
        </MarkerContext.Provider>
    );
};
