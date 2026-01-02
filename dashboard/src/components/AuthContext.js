import { createContext, useEffect, useState } from "react";
import api from "./api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    loading: true,
    user: null,
  });

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await api.post("/auth/verify");

        if (data.status) {
          setAuth({ loading: false, user: data.user });
        } else {
          setAuth({ loading: false, user: null });
        }
      } catch (err) {
        setAuth({ loading: false, user: null });
      }
    };

    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};
