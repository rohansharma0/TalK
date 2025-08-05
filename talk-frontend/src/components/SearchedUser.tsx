import { Button, Toolbar } from "@mui/material";
import User from "./User";
import { useState } from "react";
import type { IUser } from "../types/User";
import { requestService } from "../services/requestServices";

const SearchedUser = ({ user }: { user: IUser }) => {
    const [isRequestLoading, setRequestLoading] = useState(false);

    const handleSendRequest = async () => {
        try {
            setRequestLoading(true);
            await requestService.sendRequest(user._id);
        } catch (err) {
            console.log(err);
        } finally {
            setRequestLoading(false);
        }
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
            <User user={user} />
            <Button
                size="small"
                variant="contained"
                color="success"
                onClick={handleSendRequest}
                disabled={isRequestLoading}>
                {isRequestLoading ? "Sending..." : "Send Request"}
            </Button>
        </Toolbar>
    );
};

export default SearchedUser;
