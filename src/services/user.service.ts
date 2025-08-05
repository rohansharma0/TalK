import User from "../models/user.model";
import mongoose, { Types } from "mongoose";

import Requests from "../models/requests.model";
import Friend from "../models/friend.model";
import * as ConversationService from "./conversation.service";
import { IRequest, REQUEST_STATUS } from "../types/Request";

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
    const userId = new mongoose.Types.ObjectId(data.userId);
    const senderId = new mongoose.Types.ObjectId(senderUserId);

    let requestDoc = await Requests.findOne({ userId: userId });
    let senderRequestDoc = await Requests.findOne({ userId: senderId });

    if (!requestDoc) {
        requestDoc = new Requests({
            userId: userId,
            requests: [],
        });
    }
    if (!senderRequestDoc) {
        senderRequestDoc = new Requests({
            userId: senderId,
            requests: [],
        });
    }

    const alreadyAdded = requestDoc.requests.some((req) =>
        req.user._id.equals(senderId)
    );
    if (alreadyAdded) {
        throw new Error("Request already send.");
    }

    requestDoc.requests.push({
        user: senderId,
        status: REQUEST_STATUS.RECEIVE,
    } as IRequest);

    senderRequestDoc.requests.push({
        user: userId,
        status: REQUEST_STATUS.SEND,
    } as IRequest);

    await requestDoc.save();
    await senderRequestDoc.save();

    // const sockets = userSocketMap[data.userId];
    // sockets.forEach((socket) => {
    //     socket.emit("friend-request-sent", { userId: senderId });
    // });
};

export const removeRequest = async (
    data: { userId: string },
    senderUserId: string
) => {
    if (!mongoose.Types.ObjectId.isValid(data.userId)) {
        throw new Error("Invalid userId!");
    }
    const userId = new mongoose.Types.ObjectId(data.userId);
    const senderId = new mongoose.Types.ObjectId(senderUserId);

    let requestDoc = await Requests.findOne({ userId: userId });
    let senderRequestDoc = await Requests.findOne({ userId: senderId });

    if (!requestDoc || !senderRequestDoc) {
        throw new Error("Request document not found.");
    }

    const updatedRequests = requestDoc.requests.filter(
        (req) => !req.user.equals(senderId)
    );

    const updatedSenderRequests = senderRequestDoc.requests.filter(
        (req) => !req.user.equals(userId)
    );

    await Requests.updateOne(
        { userId: userId },
        { $set: { requests: updatedRequests } }
    );

    await Requests.updateOne(
        { userId: senderId },
        { $set: { requests: updatedSenderRequests } }
    );
};

export const getRequests = async (authUserId: string) => {
    return await Requests.findOne({ userId: authUserId }).populate(
        "requests.user",
        "_id username firstname lastname avatar"
    );
};

export const getReceiveRequestCount = async (authUserId: string) => {
    const requestDoc = await Requests.findOne({ userId: authUserId });
    if (!requestDoc) return 0;
    return requestDoc.requests.filter(
        (req) => req.status === REQUEST_STATUS.RECEIVE
    ).length;
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
