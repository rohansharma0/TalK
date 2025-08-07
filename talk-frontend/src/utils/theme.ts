import { colors } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";

const commonThemeOptions: ThemeOptions = {
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: false,
            },
        },
        MuiIconButton: {
            defaultProps: {
                disableRipple: true,
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                    backgroundImage: "none",
                },
            },
            defaultProps: {
                color: "default",
                position: "fixed",
                enableColorOnDark: true,
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    outline: `1px solid ${colors.grey[800]}`,
                },
            },
        },
    },
};

export const lightTheme = createTheme({
    ...commonThemeOptions,
    palette: {
        mode: "light",
        sidebar: {
            button: {
                color: "#ffffff82",
                activeColor: "#FFFFFF",
            },
        },
        // primary: {
        //     main: "#1F2029", // raisin-black
        // },
        // secondary: {
        //     main: "#8D8D8D", // battleship-gray
        // },
        // background: {
        //     default: "#F8F8F9", // seasalt
        //     paper: "#FFFFFF", // white
        // },
        // text: {
        //     primary: "#1F2029",
        //     secondary: "#585962", // davys-gray
        // },
    },
});

export const darkTheme = createTheme({
    ...commonThemeOptions,
    palette: {
        mode: "dark",
        // primary: {
        //     main: "#F8F8F9", // seasalt
        // },
        // secondary: {
        //     main: "#585962", // davys-gray
        // },
        // background: {
        //     default: "#1F2029", // raisin-black
        //     paper: "#1F2029",
        // },
        // text: {
        //     primary: "#F8F8F9",
        //     secondary: "#8D8D8D", // battleship-gray
        // },
    },
});
