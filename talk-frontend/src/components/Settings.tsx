import React from "react";
import { Grid } from "@mui/material";

const Settings = () => {
    return (
        <React.Fragment>
            <Grid
                size={8}
                sx={{
                    height: "100vh",
                }}>
                Settings
            </Grid>
            <Grid
                size={16}
                sx={{
                    height: "100vh",
                    outline: "1px solid #313131",
                }}>
                settings view
            </Grid>
        </React.Fragment>
    );
};

export default Settings;
