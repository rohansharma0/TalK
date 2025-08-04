import React from "react";
import { AppBar, Avatar, Box, IconButton, Tooltip } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ChatIcon from "@mui/icons-material/Chat";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";

import { useAuth } from "../context/AuthContext";
import { userTab } from "../context/TabContext";
import { NotificationBadge } from "./NotificationIndicator";

const SideBar = ({ children }: { children: any }) => {
    const { user } = useAuth();
    const { setSelectedTab } = userTab();
    return (
        <React.Fragment>
            <AppBar
                position="fixed"
                sx={{
                    width: "75px",
                    minWidth: "75px",
                    bgcolor: "#1d1f1f",
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
                    <Tooltip title="Add friend" placement="right">
                        <IconButton
                            aria-label="add-friend"
                            size="large"
                            color="inherit"
                            onClick={() => setSelectedTab("add-friend")}>
                            <PersonAddAlt1OutlinedIcon />
                            <NotificationBadge
                                badgeContent={2}
                                color="primary"
                                overlap="circular"
                            />
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
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Tooltip title="Settings" placement="right">
                        <IconButton
                            aria-label="settings"
                            size="large"
                            color="inherit"
                            onClick={() => setSelectedTab("settings")}>
                            <SettingsIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Profile" placement="right">
                        <IconButton
                            aria-label="profile"
                            color="inherit"
                            onClick={() => setSelectedTab("profile")}>
                            <Avatar
                                alt={user?.firstname[0] || "avatar"}
                                src={user?.avatar}
                                sx={{ width: 30, height: 30 }}></Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
            </AppBar>
            {children}
        </React.Fragment>
    );
};

export default SideBar;
