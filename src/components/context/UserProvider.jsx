import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchWithRetry } from "../../services/retryHelper";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetchWithRetry(
          () =>
            axios.get("http://127.0.0.1:8000/api/user/profile", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }),
          5, 
          1000, 
          true //requires token
        );
        setUser(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
