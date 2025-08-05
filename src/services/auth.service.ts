import bcrypt from "bcryptjs";
import User from "../models/user.model";

import { generateToken } from "../utils/jwt";

import Request from "../models/requests.model";
import Friend from "../models/friend.model";

export const register = async (data: {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    avatar: string;
}) => {
    const existingUser = await User.findOne({ username: data.username });
    if (existingUser) {
        throw new Error("Username already exists");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new User({
        username: data.username,
        password: hashedPassword,
        firstname: data.firstname,
        lastname: data.lastname,
        avatar: data.avatar,
    });
    const request = new Request({
        userId: user._id,
    });
    const friend = new Friend({
        userId: user._id,
    });
    await user.save();
    await request.save();
    await friend.save();
    return user;
};

export const login = async (data: { username: string; password: string }) => {
    const user = await User.findOne({ username: data.username });
    if (!user) throw new Error("Invalid credentials.");

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new Error("Invalid credentials.");

    const token = generateToken({
        userId: user._id,
        username: user.username,
    });

    return { user, token };
};
