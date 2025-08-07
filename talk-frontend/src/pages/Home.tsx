import React, { use, useEffect, useState } from "react";

import { Box, Button, Modal, Typography } from "@mui/material";
import { TabProvider } from "../context/TabContext";
import Tab from "../components/Tab";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "../context/AuthContext";
import {
    connectSocket as connectSocketServer,
    disconnectSocket,
} from "../services/socketService";
import SideBar from "../components/SideBar";
import { SOCKET_EVENTS } from "../socket/events";
import { useNavigate } from "react-router";

const Home: React.FC = () => {
    const { isAuthenticated, token } = useAuth();
    const { socket, setPrivateKey } = useSocket();

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

    const [openForceLogoutDialog, setOpenForceLogoutDialog] = useState(false);

    const handleCloseWindow = () => {
        disconnectSocket();
        sessionStorage.clear();
        window.location.href = "/";
    };

    const handleForceLogout = () => {
        setOpenForceLogoutDialog(true);
    };

    useEffect(() => {
        if (!socket) return;
        socket.on(SOCKET_EVENTS.FORCE_LOGOUT, handleForceLogout);
        return () => {
            socket.off(SOCKET_EVENTS.FORCE_LOGOUT, handleForceLogout);
        };
    }, [socket]);

    return (
        <>
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
            <Modal
                open={openForceLogoutDialog}
                onClose={() => {}}
                aria-labelledby="force-logout-dialog"
                aria-describedby="force-logout-description">
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "#1f1f1f",
                        color: "#fff",
                        p: 4,
                        borderRadius: 2,
                        boxShadow: 24,
                        width: 400,
                    }}>
                    <Typography
                        id="force-logout-dialog"
                        variant="h6"
                        gutterBottom>
                        Logged in from another device
                    </Typography>
                    <Typography
                        id="force-logout-description"
                        variant="body1"
                        mb={3}>
                        You have been logged out because your account was
                        accessed from another tab or device.
                    </Typography>
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button
                            onClick={handleCloseWindow}
                            variant="outlined"
                            color="secondary">
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default Home;
