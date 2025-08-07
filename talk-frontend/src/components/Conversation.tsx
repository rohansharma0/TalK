import type { IConversation } from "../types/Conversation";
import { Avatar, Badge, Box, styled, Typography } from "@mui/material";
import type { IUser } from "../types/User";
import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { SOCKET_EVENTS } from "../socket/events";

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0,
        },
    },
}));

const Conversation = ({
    data,
    userId,
}: {
    data: IConversation;
    userId: string | undefined;
}) => {
    const GroupConversation = () => {
        return (
            <Box
                display="flex"
                justifyContent="start"
                alignItems="center"
                gap="1rem"
                width="100%">
                <Avatar
                    alt="froup-avatar"
                    src={data.avatar}
                    sx={{ width: 45, height: 45 }}
                />
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="start">
                    <Typography>{data.name}</Typography>
                </Box>
            </Box>
        );
    };

    const PersonalConversation = () => {
        const { socket } = useSocket();

        const [userOnline, setUserOnline] = useState(false);

        const otherUser: IUser = data.members.filter((member) => {
            return member._id !== userId;
        })[0];

        useEffect(() => {
            if (socket) {
                socket.on(SOCKET_EVENTS.USER_STATUS, (statusData) => {
                    if (statusData.userId === otherUser._id) {
                        console.log(
                            `${otherUser.firstname} ${otherUser.lastname} is now ${statusData.status}`
                        );
                        setUserOnline(statusData.status === "ONLINE");
                    }
                });
            }
            return () => {
                socket?.off(SOCKET_EVENTS.USER_STATUS);
            };
        }, [socket]);

        return (
            <Toolbar
                sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                }}>
            <Box
                display="flex"
                justifyContent="start"
                alignItems="center"
                gap="1rem">
                {userOnline ? (
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        variant="dot">
                        <Avatar
                            alt="personal-avatar"
                            src={otherUser.avatar}
                            sx={{ width: 45, height: 45 }}
                        />
                    </StyledBadge>
                ) : (
                    <Avatar
                        alt="personal-avatar"
                        src={otherUser.avatar}
                        sx={{ width: 45, height: 45 }}
                    />
                )}
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="start">
                        <Typography fontWeight="500">{`${otherUser.firstname} ${otherUser.lastname}`}</Typography>
                        <Typography
                            color="grey"
                            fontWeight="300"
                            fontSize="0.9rem">{`@${otherUser.username}`}</Typography>
                    </Box>
                </Box>
            </Toolbar>
        );
    };

    return data.isGroup ? <GroupConversation /> : <PersonalConversation />;
};

export default Conversation;
