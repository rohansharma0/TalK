import { Document, model, Schema, Types } from "mongoose";

export enum REQUEST_STATUS {
    SEND = "SEND",
    RECEIVE = "RECEIVE",
}

export interface IRequest extends Document {
    userId: string;
    requests: Types.ObjectId[];
}

const requestSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        requests: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    },
    {
        timestamps: true,
    }
);

requestSchema.methods.toJSON = function () {
    const request = this.toObject();
    delete request.createdAt;
    delete request.updatedAt;
    delete request.__v;
    return request;
};

export default model<IRequest>("Request", requestSchema);
