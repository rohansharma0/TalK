import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

app.use(express.json());
app.use(errorHandler);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

export default app;
