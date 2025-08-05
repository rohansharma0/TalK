import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Toolbar,
    Typography,
} from "@mui/material";
import type { IUser } from "../types/User";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { requestService } from "../services/requestServices";
import { friendService } from "../services/friendServices";

const User = ({ user }: { user: IUser }) => {
    const [isRequestLoading, setRequestLoading] = useState(false);

    const handleSendRequest = async () => {
        // try {
        //     setRequestLoading(true);
        //     await requestService.sendRequest(userData._id);
        // } catch (err) {
        //     console.log(err);
        // } finally {
        //     setRequestLoading(false);
        // }
    };

    const handleRemove = async () => {
        // setRemoveDialogOpen(false);
        // try {
        //     setRemoveLoading(true);
        //     await friendService.removeFriend(userData._id);
        // } catch (err) {
        //     console.log(err);
        // } finally {
        //     setRemoveLoading(false);
        // }
    };

    return (
        <Box
            display="flex"
            justifyContent="start"
            alignItems="center"
            gap="1rem">
            <Avatar
                alt={user.firstname[0] || "avatar"}
                src={user.avatar}
                sx={{ width: 45, height: 45 }}
            />
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="start">
                <Typography fontWeight="500">{`${user.firstname} ${user.lastname}`}</Typography>
                <Typography
                    color="grey"
                    fontWeight="300"
                    fontSize="0.9rem">{`@${user.username}`}</Typography>
            </Box>
        </Box>
    );

    // return (
    // <Toolbar
    //     sx={{
    //         display: "flex",
    //         width: "100%",
    //         justifyContent: "space-between",
    //         alignItems: "center",
    //         gap: "1rem",
    //     }}>
    //     {user?._id !== userData._id &&
    //         (isFriend ? (
    //             <>

    //             </>
    //         ) : (
    //             <Button
    //                 size="small"
    //                 variant="contained"
    //                 color="success"
    //                 onClick={handleSendRequest}
    //                 disabled={isRequestLoading}>
    //                 {isRequestLoading ? "Sending..." : "Send Request"}
    //             </Button>
    //         ))}
    // </Toolbar>
    // );
};

export default User;
