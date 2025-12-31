import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    loading: true,
    user: null,
  });

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:3002/auth/verify",
          {},
          { withCredentials: true }
        );

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
