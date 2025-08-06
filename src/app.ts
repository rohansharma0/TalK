import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import requestRoutes from "./routes/request.routes";
import friendRoutes from "./routes/friend.routes";
import conversationRoutes from "./routes/conversation.routes";

import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
    })
);

app.use(express.json());
app.use(errorHandler);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/user", requestRoutes);
app.use("/api/user", friendRoutes);
app.use("/api/user", conversationRoutes);

export default app;
