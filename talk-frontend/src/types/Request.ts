import type { IUser } from "./User";

export interface IRequests {
    _id: string;
    userId: string;
    requests: IRequest[];
}
export interface IRequest {
    user: IUser;
    status: REQUEST_STATUS;
}

export type REQUEST_STATUS = "SEND" | "RECEIVE";
