import type { APIResponse } from "../types/APIResponse";
import type { IRequests } from "../types/Request";
import { axiosInstance } from "../utils/axiosInstance";
import { HttpStatusCode } from "axios";

const USER_API_URL = import.meta.env.VITE_BACKEND_URL + "/user";

export const requestService = {
    getRequests: async () => {
        const res = await axiosInstance.get<APIResponse<IRequests>>(
            `${USER_API_URL}/requests`
        );
        if (res.data.code === HttpStatusCode.Ok) {
            return res.data.data.requests;
        }
        return [];
    },

    getReceiveRequestCount: async () => {
        const res = await axiosInstance.get<APIResponse<number>>(
            `${USER_API_URL}/request`
        );
        if (res.data.code === HttpStatusCode.Ok) {
            return res.data.data;
        }
        return 0;
    },

    sendRequest: async (userId: string) => {
        return await axiosInstance.post<APIResponse<any>>(
            `${USER_API_URL}/request`,
            { userId }
        );
    },

    cancelRequest: async (userId: string) => {
        return await axiosInstance.post<APIResponse<any>>(
            `${USER_API_URL}/remove-request`,
            { userId }
        );
    },
};
