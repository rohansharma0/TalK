import type { APIResponse } from "../types/APIResponse";
import type { IConversation } from "../types/Conversation";
import type { IFriend } from "../types/Friend";
import type { IRequest } from "../types/Request";
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

    getRequests: async () => {
        const res = await axiosInstance.get<APIResponse<IRequest>>(
            `${USER_API_URL}/requests`
        );
        if (res.data.code === HttpStatusCode.Ok) {
            return res.data.data.requests;
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
    getFriends: async () => {
        const res = await axiosInstance.get<APIResponse<IFriend>>(
            `${USER_API_URL}/friends`
        );
        if (res.data.code === HttpStatusCode.Ok) {
            return res.data.data.friends;
        }
        return [];
    },

    sendRequest: async (userId: string) => {
        const res = await axiosInstance.post<APIResponse<any>>(
            `${USER_API_URL}/request`,
            { userId }
        );
        if (res.data.code === HttpStatusCode.Ok) {
            return res.data.data.friends;
        }
    },
};
