import type { IUser } from "./User";

export interface IFriend {
    _id: string;
    userId: string;
    friends: IUser[];
}
