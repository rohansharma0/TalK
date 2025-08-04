import { Server as HTTPServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { authenticateUser } from "../middlewares/socket.middleware";
import { IMessage } from "../types/Message";
import * as ConversationService from "../services/conversation.service";

let io: SocketIOServer;

export const userSocketMap: Record<string, Set<Socket>> = {};

const userPublicKeys: Record<string, string> = {};

export const initSocket = (server: HTTPServer) => {
    io = new SocketIOServer(server, {
        cors: {
            origin: process.env.FRONTEND_URL,
            methods: ["GET", "POST"],
        },
    });

    io.use(authenticateUser);

    io.on(SOCKET_EVENTS.CONNECTION, (socket: Socket) => {
        const userId = socket.data.userId;

        socket.on(
            SOCKET_EVENTS.CONNECT_USER,
            async ({ publicKey }, callback) => {
                if (!userSocketMap[userId]) {
                    userSocketMap[userId] = new Set();
                }

                userPublicKeys[userId] = publicKey;
                userSocketMap[userId].add(socket);

                await ConversationService.joinUserConversations(userId, socket);
                console.log(`🔌 ${userId} connected with socket ${socket.id}`);
                callback({
                    info: `${userId} connected with socket ${socket.id}`,
                });
            }
        );

        socket.on(SOCKET_EVENTS.GET_PUBLIC_KEY, (userId, callback) => {
            callback(userPublicKeys[userId] || null);
        });

        socket.on(SOCKET_EVENTS.DISCONNECT, () => {
            console.log(`❌  ${userId} disconnected with socket ${socket.id}`);

            for (const [userId, sockets] of Object.entries(userSocketMap)) {
                sockets.delete(socket);
                if (sockets.size === 0) {
                    delete userSocketMap[userId];
                }
            }
        });

        socket.on(SOCKET_EVENTS.MESSAGE_SEND, (data, callback) => {
            const { conversationId }: IMessage = data;
            io.to(conversationId).emit(SOCKET_EVENTS.MESSAGE_RECEIVE, data);
        });
    });
};

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};

export const SOCKET_EVENTS = {
    CONNECTION: "connection",
    CONNECT_USER: "connect:user",
    DISCONNECT: "disconnect",
    MESSAGE_SEND: "message:send",
    MESSAGE_RECEIVE: "message:receive",
    GET_PUBLIC_KEY: "get:public:key",
} as const;
