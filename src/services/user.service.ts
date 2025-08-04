import User from "../models/user.model";
import mongoose, { Types } from "mongoose";

import Request, { REQUEST_STATUS } from "../models/request.model";
import Friend from "../models/friend.model";
import * as ConversationService from "./conversation.service";
import { userSocketMap } from "../config/socket";

export const searchUser = async (query: string) => {
    return User.find({ username: { $regex: "^" + query, $options: "i" } });
};

export const sendRequest = async (
    data: { userId: string },
    senderUserId: string
) => {
    if (!mongoose.Types.ObjectId.isValid(data.userId)) {
        throw new Error("Invalid userId!");
    }

    const senderId = new mongoose.Types.ObjectId(senderUserId);
    let request = await Request.findOne({ userId: data.userId });
    let senderRequest = await Request.findOne({ userId: senderId });

    if (!request) {
        request = new Request({
            userId: data.userId,
            requests: [senderId],
        });
    } else {
        const alreadyRequested = request.requests.some(
            (id) => id.toString() === senderUserId
        );
        if (alreadyRequested) return;

        request.requests.push(senderId);
    }

    await request.save();

    // const sockets = userSocketMap[data.userId];
    // sockets.forEach((socket) => {
    //     socket.emit("friend-request-sent", { userId: senderId });
    // });
};

export const removeRequest = async (
    data: { userId: string },
    authUserId: string
) => {
    if (!mongoose.Types.ObjectId.isValid(data.userId)) {
        throw new Error("Invalid userId!");
    }
    const userId = new mongoose.Types.ObjectId(data.userId);
    let request = await Request.findOne({ userId: authUserId });

    if (!request) {
        throw new Error("Request document not found.");
    }

    const updatedRequests = request.requests.filter(
        (reqId) => !reqId.equals(userId)
    );

    await Request.updateOne(
        { userId: authUserId },
        { $set: { requests: updatedRequests } }
    );
};

export const getRequests = async (authUserId: string) => {
    return await Request.findOne({ userId: authUserId }).populate(
        "requests",
        "_id username firstname lastname avatar"
    );
};

export const getFriends = async (authUserId: string) => {
    return await Friend.findOne({ userId: authUserId }).populate(
        "friends",
        "_id username firstname lastname avatar"
    );
};

export const makeFriend = async (
    data: { userId: string },
    authUserId: string
) => {
    if (!mongoose.Types.ObjectId.isValid(data.userId)) {
        throw new Error("Invalid userId!");
    }

    const senderId = new mongoose.Types.ObjectId(data.userId);
    const receiverId = new mongoose.Types.ObjectId(authUserId);

    let senderFriendDoc = await Friend.findOne({ userId: data.userId });
    let receiverFriendDoc = await Friend.findOne({ userId: authUserId });

    if (!senderFriendDoc) {
        senderFriendDoc = new Friend({
            userId: data.userId,
            friends: [receiverId],
        });
    } else {
        const alreadyAdded = senderFriendDoc.friends.some((id) =>
            id.equals(receiverId)
        );
        if (alreadyAdded) return;

        senderFriendDoc.friends.push(receiverId);
    }

    if (!receiverFriendDoc) {
        receiverFriendDoc = new Friend({
            userId: authUserId,
            friends: [senderId],
        });
    } else {
        const alreadyAdded = receiverFriendDoc.friends.some((id) =>
            id.equals(senderId)
        );
        if (alreadyAdded) return;

        receiverFriendDoc.friends.push(senderId);
    }
    await senderFriendDoc.save();
    await receiverFriendDoc.save();
    await removeRequest(data, authUserId);

    const conversation = await ConversationService.createConversation(
        { members: [data.userId, authUserId] },
        { isGroup: false, createdBy: authUserId }
    );
    // const senderSockets = userSocketMap[data.userId];
    // const receiverSockets = userSocketMap[authUserId];

    // if (senderSockets) {
    //     senderSockets.forEach((socket) => {
    //         socket.join((conversation._id as Types.ObjectId).toString());
    //         socket.emit("friend-request-accepted", {
    //             userId: senderId,
    //         });
    //         socket.emit("conversation", {
    //             message: "conversation added.",
    //         });
    //     });
    // }
    // if (receiverSockets) {
    //     receiverSockets.forEach((socket) => {
    //         socket.join((conversation._id as Types.ObjectId).toString());
    //         socket.emit("conversation", {
    //             message: "conversation added.",
    //         });
    //     });
    // }
    return conversation;
};

export const removeFriend = async (
    data: { userId: string },
    authUserId: string
) => {
    if (!mongoose.Types.ObjectId.isValid(data.userId)) {
        throw new Error("Invalid userId!");
    }
    const friendUserId = new mongoose.Types.ObjectId(data.userId);
    const myUserId = new mongoose.Types.ObjectId(authUserId);

    let friendOneDoc = await Friend.findOne({ userId: data.userId });
    let friendTwoDoc = await Friend.findOne({ userId: authUserId });

    if (!friendOneDoc || !friendTwoDoc) {
        throw new Error("Friend document not found.");
    }

    const updatedFriendOne = friendOneDoc.friends.filter(
        (reqId) => !reqId.equals(myUserId)
    );

    const updatedFriendTwo = friendTwoDoc.friends.filter(
        (reqId) => !reqId.equals(friendUserId)
    );

    await Friend.updateOne(
        { userId: data.userId },
        { $set: { friends: updatedFriendOne } }
    );

    await Friend.updateOne(
        { userId: authUserId },
        { $set: { friends: updatedFriendTwo } }
    );
};

export const isUsernameAvailable = async (username: string) => {
    const existingUser = await User.findOne({ username: username });
    return !existingUser;
};
