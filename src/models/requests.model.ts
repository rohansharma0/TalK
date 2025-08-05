import { model, Schema, Types } from "mongoose";
import { IRequest, IRequests, REQUEST_STATUS } from "../types/Request";

const requestSchema = new Schema<IRequest>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(REQUEST_STATUS),
            required: true,
        },
    },
    { _id: false }
);

const requestsSchema = new Schema<IRequests>(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        requests: {
            type: [requestSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

requestsSchema.methods.toJSON = function () {
    const requests = this.toObject();
    delete requests.createdAt;
    delete requests.updatedAt;
    delete requests.__v;
    return requests;
};

export default model<IRequests>("Requests", requestsSchema);
