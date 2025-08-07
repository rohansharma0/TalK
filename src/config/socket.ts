import { Server as HTTPServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { authenticateUser } from "../middlewares/socket.middleware";
import { IMessage } from "../types/Message";
import * as ConversationService from "../services/conversation.service";
import { logger } from "../utils/logger";

let io: SocketIOServer;

export const userSocketMap: Map<string, string> = new Map();

const userPublicKeys: Map<string, string> = new Map();

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
                const existingSocketId = userSocketMap.get(userId);

                if (existingSocketId && existingSocketId !== socket.id) {
                    const oldSocket = io.sockets.sockets.get(existingSocketId);
                    if (oldSocket) {
                        oldSocket.emit(SOCKET_EVENTS.FORCE_LOGOUT, {
                            info: `User ${userId} is logged in from another device.`,
                        });
                        oldSocket.disconnect(true);
                    }
                }

                userSocketMap.set(userId, socket.id);
                socket.broadcast.emit(SOCKET_EVENTS.USER_STATUS, {
                    userId,
                    status: "ONLINE",
                });

                userPublicKeys.set(userId, publicKey);

                // await ConversationService.joinUserConversations(userId, socket);
                logger.debug(`${userId} connected with socket ${socket.id}`);
                callback({
                    info: `${userId} connected with socket ${socket.id}`,
                });
            }
        );

        socket.on(SOCKET_EVENTS.GET_PUBLIC_KEY, (userId, callback) => {
            callback(userPublicKeys.get(userId) || null);
        });

        socket.on(SOCKET_EVENTS.DISCONNECT, () => {
            logger.debug(`${userId} disconnected with socket ${socket.id}`);

            if (userId && userSocketMap.get(userId) === socket.id) {
                userSocketMap.delete(userId);
                socket.broadcast.emit(SOCKET_EVENTS.USER_STATUS, {
                    userId,
                    status: "OFFLINE",
                });
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
    USER_STATUS: "user:status",
    FORCE_LOGOUT: "force:logout",
    DISCONNECT: "disconnect",
    MESSAGE_SEND: "message:send",
    MESSAGE_RECEIVE: "message:receive",
    GET_PUBLIC_KEY: "get:public:key",
} as const;
