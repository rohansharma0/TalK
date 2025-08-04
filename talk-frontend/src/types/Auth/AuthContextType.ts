import type { IUser } from "../User";
import type { AuthResponse } from "./AuthResponse";

export interface AuthContextType {
    isAuthenticated: boolean;
    user: IUser | null;
    token: string | null;
    login: (data: AuthResponse) => void;
    logout: () => void;
}
