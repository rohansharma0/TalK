import { Button, ButtonGroup, Toolbar } from "@mui/material";
import type { IRequest } from "../types/Request";
import User from "./User";

const Request = ({
    request,
    onCancel,
    onAccept,
}: {
    request: IRequest;
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
            <User user={request.user} />
            <ButtonGroup
                disableElevation
                color="primary"
                variant="contained"
                aria-label="request-actions">
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onCancel(request.user._id)}>
                    Cancel
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => onAccept(request.user._id)}>
                    Accept
                </Button>
            </ButtonGroup>
        </Toolbar>
    );
};

export default Request;
