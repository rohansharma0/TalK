import { Document, Types } from "mongoose";

export interface IRequests extends Document {
    userId: string;
    requests: IRequest[];
}

export interface IRequest {
    user: Types.ObjectId;
    status: REQUEST_STATUS;
}

export enum REQUEST_STATUS {
    SEND = "SEND",
    RECEIVE = "RECEIVE",
}
