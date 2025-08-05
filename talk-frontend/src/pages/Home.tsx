import React, { useEffect } from "react";

import { Box } from "@mui/material";
import { TabProvider } from "../context/TabContext";
import Tab from "../components/Tab";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "../context/AuthContext";
import {
    connectSocket as connectSocketServer,
    disconnectSocket,
} from "../services/socketService";
import SideBar from "../components/SideBar";

const Home: React.FC = () => {
    const { isAuthenticated, token } = useAuth();
    const { setPrivateKey } = useSocket();

    useEffect(() => {
        if (isAuthenticated && token) {
            connectSocket(token);
        }
        return () => {
            disconnectSocket();
        };
    }, [isAuthenticated]);

    const connectSocket = async (token: string) => {
        const { privateKey } = await connectSocketServer(token);
        setPrivateKey(privateKey);
    };

    return (
        <TabProvider>
            <SideBar>
                <Box
                    sx={{
                        flexGrow: 1,
                        height: "100vh",
                        width: "calc(100vw - 75px)",
                        position: "fixed",
                        right: 0,
                        top: 0,
                        bottom: 0,
                        bgcolor: "#161717",
                        color: "#fff",
                    }}>
                    <Tab />
                </Box>
            </SideBar>
        </TabProvider>
    );
};

export default Home;
