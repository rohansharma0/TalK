import type { AuthResponse } from "../types/Auth/AuthResponse";
import type { IUser } from "../types/User";
import type { APIResponse } from "../types/APIResponse";
import { axiosInstance } from "../utils/axiosInstance";

const AUTH_API_URL = import.meta.env.VITE_BACKEND_URL + "/auth";

export const authService = {
    login: async (
        username: string,
        password: string
    ): Promise<AuthResponse> => {
        const res = await axiosInstance.post<APIResponse<AuthResponse>>(
            `${AUTH_API_URL}/login`,
            { username, password }
        );
        return res.data.data;
    },

    register: async (
        firstname: string,
        lastname: string,
        username: string,
        password: string
    ): Promise<AuthResponse> => {
        const user = {
            firstname,
            lastname,
            username,
            password,
        };
        const res = await axiosInstance.post<APIResponse<AuthResponse>>(
            `${AUTH_API_URL}/register`,
            user
        );
        return res.data.data;
    },

    logout: () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
    },

    saveSession: (token: string, user: IUser) => {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));
    },

    getToken: (): string | null => sessionStorage.getItem("token"),

    getUser: (): IUser | null => {
        const user = sessionStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated: (): boolean => !!sessionStorage.getItem("token"),
};
