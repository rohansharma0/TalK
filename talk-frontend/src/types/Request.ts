import type { IUser } from "./User";

export interface IRequest {
    _id: string;
    userId: string;
    requests: IUser[];
}
