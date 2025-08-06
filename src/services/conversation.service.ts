import mongoose, { Types } from "mongoose";
import Conversation from "../models/conversation.model";
import { Socket } from "socket.io";

export const getConversations = async (authUserId: string) => {
    return await Conversation.find({
        members: {
            $in: authUserId,
        },
    }).populate("members", "_id username firstname lastname avatar");
};

export const createGroupConversation = async (
    data: {
        name: string;
        avatar?: string;
        members: string[];
    },
    info: {
        createdBy: string;
    }
) => {
    const memberList: mongoose.Types.ObjectId[] = [];
    const adminList: mongoose.Types.ObjectId[] = [];

    data.members.map((id) => {
        if (mongoose.Types.ObjectId.isValid(id)) {
            memberList.push(new mongoose.Types.ObjectId(id));
        }
    });

    adminList.push(new mongoose.Types.ObjectId(info.createdBy));

    const conversation = new Conversation({
        name: data.name,
        avatar: data.avatar,
        isGroup: true,
        members: memberList,
        admins: adminList,
        createdBy: new mongoose.Types.ObjectId(info.createdBy),
    });

    await conversation.save();

    // data.members.map((id) => {
    //     const sockets = userSocketMap[id];
    //     if (sockets && sockets.size != 0) {
    //         if (id === info.createdBy) {
    //             sockets.forEach((socket) => {
    //                 socket.join(
    //                     (conversation._id as Types.ObjectId).toString()
    //                 );
    //                 socket.emit("conversation", {
    //                     message: "Conversation added.",
    //                 });
    //             });
    //         } else {
    //             sockets.forEach((socket) => {
    //                 socket.join(
    //                     (conversation._id as Types.ObjectId).toString()
    //                 );
    //                 socket.emit("conversation", {
    //                     message: "Conversation added.",
    //                 });
    //             });
    //         }
    //     }
    // });

    return conversation;
};

export const createConversation = async (data: {
    userOne: string;
    userTwo: string;
    createdBy: string;
}) => {
    const memberList: mongoose.Types.ObjectId[] = [];

    if (mongoose.Types.ObjectId.isValid(data.userOne)) {
        memberList.push(new mongoose.Types.ObjectId(data.userOne));
    }
    if (mongoose.Types.ObjectId.isValid(data.userTwo)) {
        memberList.push(new mongoose.Types.ObjectId(data.userTwo));
    }

    const oldConversation = await Conversation.findOne({
        members: { $in: [data.userOne] },
    });

    if (oldConversation) return oldConversation;

    const conversation = new Conversation({
        isGroup: false,
        members: memberList,
        createdBy: new mongoose.Types.ObjectId(data.createdBy),
    });

    await conversation.save();

    // data.members.map((id) => {
    //     const sockets = userSocketMap[id];
    //     if (sockets && sockets.size != 0) {
    //         if (id === info.createdBy) {
    //             sockets.forEach((socket) => {
    //                 socket.join(
    //                     (conversation._id as Types.ObjectId).toString()
    //                 );
    //                 socket.emit("conversation", {
    //                     message: "Conversation added.",
    //                 });
    //             });
    //         } else {
    //             sockets.forEach((socket) => {
    //                 socket.join(
    //                     (conversation._id as Types.ObjectId).toString()
    //                 );
    //                 socket.emit("conversation", {
    //                     message: "Conversation added.",
    //                 });
    //             });
    //         }
    //     }
    // });
    return conversation;
};

export const deletePersonalConversation = async (
    data: {
        userId: string;
    },
    authUserId: string
) => {
    const user1 = new mongoose.Types.ObjectId(data.userId);
    const user2 = new mongoose.Types.ObjectId(authUserId);

    await Conversation.deleteOne({
        isGroup: false,
        members: {
            $all: [user1, user2],
        },
        $expr: {
            $eq: [
                {
                    $size: "$members",
                },
                2,
            ],
        },
    });
};

export const joinUserConversations = async (userId: string, socket: Socket) => {
    const conversations = await Conversation.find({
        members: { $in: [userId] },
    });

    conversations.forEach((conv) => {
        socket.join((conv._id as Types.ObjectId).toString());
    });
};
