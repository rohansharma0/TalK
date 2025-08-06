import type { IConversation } from "../types/Conversation";
import { Avatar, Box, Toolbar, Typography } from "@mui/material";
import type { IUser } from "../types/User";

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
        const otherUser: IUser = data.members.filter((member) => {
            return member._id !== userId;
        })[0];
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
                    <Avatar
                        alt="personal-avatar"
                        src={otherUser.avatar}
                        sx={{ width: 45, height: 45 }}
                    />
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
