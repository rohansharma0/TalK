import type { APIResponse } from "../types/APIResponse";
import type { IFriend } from "../types/Friend";
import { axiosInstance } from "../utils/axiosInstance";
import { HttpStatusCode } from "axios";

const USER_API_URL = import.meta.env.VITE_BACKEND_URL + "/user";

export const friendService = {
    getFriends: async () => {
        const res = await axiosInstance.get<APIResponse<IFriend>>(
            `${USER_API_URL}/friends`
        );
        if (res.data.code === HttpStatusCode.Ok) {
            return res.data.data.friends;
        }
        return [];
    },

    removeFriend: async (userId: string) => {
        return await axiosInstance.post<APIResponse<any>>(
            `${USER_API_URL}/remove-friend`,
            { userId }
        );
    },

    makeFriend: async (userId: string) => {
        const res = await axiosInstance.post<APIResponse<any>>(
            `${USER_API_URL}/friend`,
            { userId }
        );
        if (res.data.code === HttpStatusCode.Ok) {
            return res.data.data;
        }
    },
};
