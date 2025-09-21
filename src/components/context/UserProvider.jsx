import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchWithRetry } from "../../services/retryHelper";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  async function fetchUser() {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.warn("No token found, skipping user fetch.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetchWithRetry(
        () =>
          axios.get("http://127.0.0.1:8000/api/user/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        5,
        1000,
        true // requires token
      );
      setUser(res.data.user);
      console.log("user fetched:", res.data);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      console.log("Token used:", token);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  async function updateProfile(data) {
    const url = `http://127.0.0.1:8000/api/profile/edit`;
    const token = localStorage.getItem("accessToken");
    let payload;

    if (data instanceof FormData) {
      payload = data;
    } else {
      payload = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        payload.append(key, value);
      });
    }
    for (let [key, value] of payload.entries()) {
      console.log("formData", key, value);
    }

    try {
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchUser()
      return { ok: true, data: response.data };
    } catch (error) {
      if (error.response) {
        return { ok: false, error: error.response.data.message };
      } else {
      return { ok: false, error: error.message };
      }
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, loading, updateProfile, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
