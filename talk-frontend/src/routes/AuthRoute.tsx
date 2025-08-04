import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";

const AuthRoute = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AuthRoute;
