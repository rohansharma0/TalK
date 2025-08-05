import type { APIResponse } from "../types/APIResponse";
import type { IConversation } from "../types/Conversation";
import type { IUser } from "../types/User";
import { axiosInstance } from "../utils/axiosInstance";
import { HttpStatusCode } from "axios";

const USER_API_URL = import.meta.env.VITE_BACKEND_URL + "/user";

export const userService = {
    getConversations: async () => {
        const res = await axiosInstance.get<APIResponse<IConversation[]>>(
            `${USER_API_URL}/conversations`
        );
        if (res.data.code === HttpStatusCode.Ok) {
            return res.data.data;
        }
        return [];
    },

    searchUsers: async (query: string) => {
        const res = await axiosInstance.get<APIResponse<IUser[]>>(
            `${USER_API_URL}/search`,
            {
                params: { q: query },
            }
        );
        if (res.data.code === HttpStatusCode.Ok) {
            return res.data.data;
        }
        return [];
    },
};
