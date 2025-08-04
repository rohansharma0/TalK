import { Grid } from "@mui/material";
import React from "react";

const Profile = () => {
    return (
        <React.Fragment>
            <Grid
                size={8}
                sx={{
                    height: "100vh",
                }}>
                Profile
            </Grid>
            <Grid
                size={16}
                sx={{
                    height: "100vh",
                    outline: "1px solid #313131",
                }}>
                profile view
            </Grid>
        </React.Fragment>
    );
};

export default Profile;
