import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    avatar?: string;
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: null,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.__v;
    return user;
};

export default model<IUser>("User", userSchema);
