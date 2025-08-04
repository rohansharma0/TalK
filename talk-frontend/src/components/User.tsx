import { Avatar, Box, Button, Toolbar, Typography } from "@mui/material";
import type { IUser } from "../types/User";
import { useAuth } from "../context/AuthContext";
import { userService } from "../services/userServices";
import { useState } from "react";

const User = ({
    userData,
    isFriend = false,
}: {
    userData: IUser;
    isFriend?: boolean;
}) => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const handleSendRequest = async () => {
        try {
            setIsLoading(true);
            console.log("Request send to :" + userData._id);
            await userService.sendRequest(userData._id);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAcceptRequest = () => {};

    const handleCancelRequest = () => {};
    const handleRemoveFriend = () => {};

    const getActionButtons = () => {
        if (isFriend) {
            return (
                <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={handleRemoveFriend}>
                    Remove
                </Button>
            );
        }
        return (
            <>
                {user?._id !== userData._id && (
                    <Button
                        size="small"
                        variant="contained"
                        color="success"
                        loading={isLoading}
                        onClick={handleSendRequest}>
                        Send Request
                    </Button>
                )}
            </>
        );
    };
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
                    alt={userData.firstname[0] || "avatar"}
                    src={userData.avatar}
                    sx={{ width: 45, height: 45 }}
                />
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="start">
                    <Typography fontWeight="500">{`${userData.firstname} ${userData.lastname}`}</Typography>
                    <Typography
                        color="grey"
                        fontWeight="300"
                        fontSize="0.9rem">{`@${userData.username}`}</Typography>
                </Box>
            </Box>
            {getActionButtons()}
        </Toolbar>
    );
};

export default User;
