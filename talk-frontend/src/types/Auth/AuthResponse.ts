import type { IUser } from "../User";

export interface AuthResponse {
    user: IUser;
    token: string;
}
