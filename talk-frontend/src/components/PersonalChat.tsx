import React, { useCallback, useEffect, useState } from "react";
import type { IConversation } from "../types/Conversation";
import {
    AppBar,
    Avatar,
    Box,
    Divider,
    IconButton,
    InputBase,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import type { IUser } from "../types/User";
import { useAuth } from "../context/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import SendIcon from "@mui/icons-material/Send";
import * as SocketService from "../services/socketService";
import type { IMessage } from "../types/Message";
import Message from "./Message";
import { v4 as uuidv4 } from "uuid";
import { decryptMessage } from "../socket/socket";
import { useSocket } from "../context/SocketContext";

const PersonalChat = ({ data }: { data: IConversation }) => {
    const { user } = useAuth();

    const { privateKey } = useSocket();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const otherUser: IUser = data.members.filter((member) => {
        return member._id !== user?._id;
    })[0];

    const [message, setMessage] = useState<string>("");

    const handleMessageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message?.trim() || !user) {
            setMessage("");
            return;
        }
        const messageData: IMessage = {
            _id: uuidv4(),
            from: user._id,
            conversationId: data._id,
            data: message,
            timestamp: new Date().toISOString(),
        };
        if (publicKey) SocketService.sendMessage(messageData, publicKey);

        setChats((prevChats) => [...prevChats, messageData]);
        setMessage("");
    };

    const [chats, setChats] = useState<IMessage[]>([]);
    const [publicKey, setPublicKey] = useState<CryptoKey | null>(null);

    useEffect(() => {
        getKey();
    }, [data._id]);

    const getKey = async () => {
        const key = await SocketService.getPublicKey(otherUser._id);
        setPublicKey(key);
    };
    const handleReceiveMessage = useCallback(
        async (encryptedMessage: IMessage) => {
            if (
                encryptedMessage.from !== user?._id &&
                encryptedMessage.conversationId === data._id &&
                privateKey
            ) {
                const decrypted = await decryptMessage(
                    encryptedMessage.data,
                    privateKey
                );
                const msg: IMessage = { ...encryptedMessage, data: decrypted };
                setChats((prev) => [...prev, msg]);
            }
        },
        [user?._id, data._id, privateKey]
    );

    useEffect(() => {
        SocketService.receiveMessage(handleReceiveMessage);
        return () => {
            SocketService.removeMessageListener(handleReceiveMessage);
        };
    }, [handleReceiveMessage]);

    return (
        <Box
            height="100vh"
            display="flex"
            flexDirection="column"
            bgcolor="#000000ff">
            <AppBar
                position="static"
                sx={{
                    bgcolor: "#161717",
                    color: "#fff",
                    boxShadow: "none",
                    zIndex: 1,
                }}>
                <Toolbar sx={{ display: "flex", width: "100%" }}>
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="flex-start"
                        gap="1.2rem"
                        flex="auto"
                        alignItems="center">
                        <Avatar
                            alt="personal-avatar"
                            src={otherUser.avatar}
                            sx={{ width: 40, height: 40 }}
                        />
                        <Typography fontWeight="600" fontSize="1rem">
                            {`${otherUser.firstname} ${otherUser.lastname}`}
                        </Typography>
                    </Box>

                    <IconButton
                        size="large"
                        aria-label="chats-menu-button"
                        edge="end"
                        color="inherit"
                        onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="chats-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        slotProps={{
                            list: {
                                "aria-labelledby": "chats-menu-items",
                            },
                        }}>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <GroupAddOutlinedIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>New group</ListItemText>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <LogoutOutlinedIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Log out</ListItemText>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Box
                flex="1"
                overflow="auto"
                p={2}
                bgcolor="tranparent"
                display="flex"
                gap={1.5}
                flexDirection="column"
                justifyContent="flex-end">
                {chats.map((chat: IMessage) => {
                    return <Message key={chat._id} message={chat} />;
                })}
            </Box>
            <Box<"form">
                component="form"
                onSubmit={handleSendMessage}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "50px",
                    bgcolor: "#242626",
                    borderRadius: "2rem",
                    m: "0 1rem 1rem",
                    px: "6px",
                }}>
                <IconButton sx={{ color: "#fff" }}>
                    <AddIcon />
                </IconButton>
                <InputBase
                    placeholder="Type a message"
                    fullWidth
                    value={message}
                    onChange={handleMessageChange}
                    sx={{
                        color: "#fff",
                        ml: 1,
                        flex: 1,
                        caretColor: "#17ff4b",
                    }}
                    inputProps={{ "aria-label": "type a message" }}
                />
                {message ? (
                    <>
                        <IconButton
                            type="submit"
                            sx={{
                                color: "#000",
                                bgcolor: "#17ff4b",
                                "&:hover": {
                                    bgcolor: "#18ad3bff",
                                },
                            }}>
                            <SendIcon />
                        </IconButton>
                    </>
                ) : (
                    <>
                        <IconButton sx={{ color: "#fff" }}>
                            <MicNoneOutlinedIcon />
                        </IconButton>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default PersonalChat;
