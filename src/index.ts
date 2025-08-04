import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import { createServer } from "http";
import { initSocket } from "./config/socket";

const PORT = process.env.PORT || 3000;

const server = createServer(app);

connectDB().then(() => {
    initSocket(server);

    server.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
});
