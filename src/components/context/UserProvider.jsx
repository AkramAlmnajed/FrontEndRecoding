import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [layer, setLayer] = useState(() => localStorage.getItem("layer") || null);
  const [email, setEmail] = useState(() => localStorage.getItem("email") || null);
  const [password, setPassword] = useState(() => localStorage.getItem("password") || null);
  const [name, setName] = useState(() => localStorage.getItem("name") || null);

  useEffect(() => {
    if (layer) localStorage.setItem("layer", layer);
    else localStorage.removeItem("layer");
  }, [layer]);

  useEffect(() => {
    if (email) localStorage.setItem("email", email);
    else localStorage.removeItem("email");
  }, [email]);

  useEffect(() => {
    if (password) localStorage.setItem("password", password);
    else localStorage.removeItem("password");
  }, [password]);

  useEffect(() => {
    if (name) localStorage.setItem("name", name);
    else localStorage.removeItem("name");
  }, [name]);

  return (
    <UserContext.Provider
      value={{ layer, setLayer, password, setPassword, name, setName, email, setEmail }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
