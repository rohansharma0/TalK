import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import type { IUser } from "../types/User";
import { authService } from "../services/authServices";
import type { AuthContextType } from "../types/Auth/AuthContextType";
import type { AuthResponse } from "../types/Auth/AuthResponse";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        authService.isAuthenticated()
    );
    const [user, setUser] = useState<IUser | null>(authService.getUser());
    const [token, setToken] = useState<string | null>(authService.getToken());

    const login = (data: AuthResponse) => {
        authService.saveSession(data.token, data.user);
        setUser(data.user);
        setToken(data.token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
    };

    useEffect(() => {
        const storedUser = authService.getUser();
        const storedToken = authService.getToken();
        if (storedUser && storedToken) {
            setUser(storedUser);
            setToken(storedToken);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};
