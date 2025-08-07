import React from "react";
import { Button, Grid, IconButton } from "@mui/material";
import { useThemeMode } from "../context/ThemeContext";

const Settings = () => {
    const { toggleColorMode } = useThemeMode();

    return (
        <React.Fragment>
            <Grid
                size={8}
                sx={{
                    height: "100vh",
                }}>
                Settings
                <Button
                    onClick={toggleColorMode}
                    color="primary"
                    variant="contained">
                    Change Theme
                </Button>
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
