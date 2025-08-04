import { Document, model, Schema, Types } from "mongoose";

export interface IFriend extends Document {
    userId: string;
    friends: Types.ObjectId[];
}

const friendSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        friends: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    },
    {
        timestamps: true,
    }
);

friendSchema.methods.toJSON = function () {
    const friend = this.toObject();
    delete friend.createdAt;
    delete friend.updatedAt;
    delete friend.__v;
    return friend;
};

export default model<IFriend>("Friend", friendSchema);
