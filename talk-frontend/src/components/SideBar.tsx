import React from "react";
import { AppBar, Avatar, Box, IconButton, Tooltip } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ChatIcon from "@mui/icons-material/Chat";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

import { useAuth } from "../context/AuthContext";
import { userTab } from "../context/TabContext";
import { NotificationBadge } from "./NotificationIndicator";
import { requestService } from "../services/requestServices";
import { useQuery } from "@tanstack/react-query";

const SideBar = ({ children }: { children: any }) => {
    const { user } = useAuth();
    const { setSelectedTab } = userTab();

    const { data: receiveRequestCount } = useQuery<number>({
        queryKey: ["receive-request-count"],
        queryFn: requestService.getReceiveRequestCount,
    });

    return (
        <React.Fragment>
            <AppBar
                position="fixed"
                sx={{
                    width: "75px",
                    minWidth: "75px",
                    color: "#fff",
                    height: "100vh",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    outline: "1px solid #313131",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "0.5rem",
                    zIndex: 3,
                }}>
                <Tooltip title="Profile" placement="right">
                    <IconButton
                        aria-label="profile"
                        color="primary"
                        onClick={() => setSelectedTab("profile")}>
                        <Avatar
                            alt={user?.firstname[0] || "avatar"}
                            src={user?.avatar}
                            sx={{ width: 40, height: 40, color: "primary" }}>
                            {user?.firstname[0]}
                        </Avatar>
                    </IconButton>
                </Tooltip>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Tooltip title="Chats" placement="right">
                        <IconButton
                            aria-label="chats"
                            size="large"
                            color="inherit"
                            onClick={() => setSelectedTab("chats")}>
                            <ChatIcon />
                            <NotificationBadge
                                badgeContent={2}
                                color="primary"
                                overlap="circular"
                            />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Requests" placement="right">
                        <IconButton
                            aria-label="requests"
                            size="large"
                            color="inherit"
                            onClick={() => setSelectedTab("requests")}>
                            <PersonAddAlt1OutlinedIcon />
                            {receiveRequestCount && receiveRequestCount > 0 ? (
                                <NotificationBadge
                                    badgeContent={receiveRequestCount}
                                    color="primary"
                                    overlap="circular"
                                />
                            ) : null}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Friends" placement="right">
                        <IconButton
                            aria-label="friends"
                            size="large"
                            color="inherit"
                            onClick={() => setSelectedTab("friends")}>
                            <GroupOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Settings" placement="right">
                        <IconButton
                            aria-label="settings"
                            size="large"
                            color="inherit"
                            onClick={() => setSelectedTab("settings")}>
                            <SettingsIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Tooltip title="New chat" placement="right">
                    <IconButton
                        aria-label=""
                        color="inherit"
                        onClick={() => setSelectedTab("profile")}>
                        <AddCircleOutlinedIcon sx={{ width: 48, height: 48 }} />
                    </IconButton>
                </Tooltip>
            </AppBar>
            {children}
        </React.Fragment>
    );
};

export default SideBar;
