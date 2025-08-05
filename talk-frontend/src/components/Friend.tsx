import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Toolbar,
} from "@mui/material";
import User from "./User";
import { useState } from "react";
import type { IUser } from "../types/User";

const Friend = ({
    friend,
    onRemove,
}: {
    friend: IUser;
    onRemove: (userId: string) => void;
}) => {
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
    const [isRemoveLoading, setRemoveLoading] = useState(false);

    const handleRemove = async () => {
        setRemoveDialogOpen(false);
        try {
            setRemoveLoading(true);
            onRemove(friend._id);
        } catch (err) {
            console.log(err);
        } finally {
            setRemoveLoading(false);
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
            <User user={friend} />
            <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => setRemoveDialogOpen(true)}
                disabled={isRemoveLoading}>
                Remove
            </Button>
            <Dialog
                open={removeDialogOpen}
                onClose={() => setRemoveDialogOpen(false)}>
                <DialogTitle>Are you sure you want to remove?</DialogTitle>
                <DialogActions>
                    <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={handleRemove}
                        disabled={isRemoveLoading}>
                        {isRemoveLoading ? "Removing..." : "Remove"}
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        color="info"
                        onClick={() => setRemoveDialogOpen(false)}
                        autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Toolbar>
    );
};

export default Friend;
