import { Button, Toolbar } from "@mui/material";
import User from "./User";
import type { IUser } from "../types/User";

const SearchedUser = ({
    user,
    onRequest,
}: {
    user: IUser;
    onRequest: (userId: string) => void;
}) => {
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
                onClick={() => onRequest(user._id)}>
                Request
            </Button>
        </Toolbar>
    );
};

export default SearchedUser;
