import { Box, Typography } from "@mui/material";
import type { IMessage } from "../types/Message";
import { useAuth } from "../context/AuthContext";

const Message = ({ message }: { message: IMessage }) => {
    const { user } = useAuth();

    const date = new Date(message.timestamp);
    const formatedDate = date.toLocaleString("en-IN", {
        timeStyle: "short",
    });

    return (
        <Box
            display="flex"
            justifyContent={
                user?._id === message.from ? "flex-end" : "flex-start"
            }>
            <Box
                bgcolor={user?._id === message.from ? "#144d37" : "#242626"}
                sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "5px",
                    borderRadius: "10px",
                    width: "fit-content",
                    color: "#fff",
                    padding: "0.2rem 0.6rem",
                }}>
                <Typography fontSize="0.8rem" fontWeight="500">
                    {message.data}
                </Typography>
                <Typography fontSize="0.6rem" fontWeight="400">
                    {formatedDate}
                </Typography>
            </Box>
        </Box>
    );
};

export default Message;
