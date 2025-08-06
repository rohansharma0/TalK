import mongoose from "mongoose";

import Requests from "../models/requests.model";
import { IRequest, REQUEST_STATUS } from "../types/Request";

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
