import { Document, model, Schema, Types } from "mongoose";

export interface IConversation extends Document {
    name?: string;
    avatar?: string;
    members: Types.ObjectId[];
    createdBy: Types.ObjectId;
    isGroup: boolean;
    admins?: Types.ObjectId[];
}

const conversationSchema = new Schema<IConversation>(
    {
        name: {
            type: String,
            default: null,
        },
        avatar: {
            type: String,
            default: null,
        },
        isGroup: {
            type: Boolean,
            required: true,
            default: false,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        admins: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                default: [],
                required: false,
            },
        ],
        members: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    },
    {
        timestamps: true,
    }
);

conversationSchema.methods.toJSON = function () {
    const conversation = this.toObject();
    delete conversation.createdAt;
    delete conversation.updatedAt;
    delete conversation.__v;
    return conversation;
};

export default model<IConversation>("Conversation", conversationSchema);
