import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="auth" element={<AuthRoute />}>
                    <Route index element={<Navigate to="login" replace />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
