import { Socket } from "socket.io";
import jwt from "jsonwebtoken";

export const authenticateUser = (socket: Socket, next: any) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Token required"));
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
        socket.data.userId = (decoded as any).userId;
        next();
    } catch (err) {
        next(new Error("Invalid token"));
    }
};
