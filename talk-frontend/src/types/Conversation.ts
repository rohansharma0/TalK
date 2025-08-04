import type { IUser } from "./User";

export interface IConversation {
    _id: string;
    name?: string;
    avatar?: string;
    members: IUser[];
    createdBy: string;
    isGroup: boolean;
    admins?: IUser[];
}
