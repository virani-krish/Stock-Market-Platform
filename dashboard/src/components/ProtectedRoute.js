import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
    const { loading, user } = useContext(AuthContext);

    useEffect(() => {
        if (!loading && !user) {
            window.location.replace("http://localhost:3000/login");
        }
    }, [loading, user]);


    if (loading) {
        return null; // or loader
    }

    if (!user) {
        return null;
    }

    return children;
};

export default ProtectedRoute;
