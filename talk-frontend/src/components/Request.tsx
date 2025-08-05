import { Button, ButtonGroup, Toolbar } from "@mui/material";
import type { REQUEST_STATUS } from "../types/Request";
import User from "./User";
import type { IUser } from "../types/User";

const Request = ({
    user,
    status,
    onCancel,
    onAccept,
}: {
    user: IUser;
    status: REQUEST_STATUS;
    onCancel: (userId: string) => void;
    onAccept: (userId: string) => void;
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
            {status === "SEND" && (
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onCancel(user._id)}>
                    Cancel
                </Button>
            )}
            {status === "RECEIVE" && (
                <ButtonGroup
                    disableElevation
                    color="primary"
                    variant="contained"
                    aria-label="request-actions">
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => onCancel(user._id)}>
                        Cancel
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => onAccept(user._id)}>
                        Accept
                    </Button>
                </ButtonGroup>
            )}
        </Toolbar>
    );
};

export default Request;
