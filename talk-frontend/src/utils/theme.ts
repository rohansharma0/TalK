import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1F2029ff",
            // contrastText: "#fff",
        },
        secondary: {
            main: "#8D8D8Dff",
        },
        background: {
            default: "#F8F8F9ff",
        },
    },
});
// $white: #FFFFFFff; //backgroup
// $seasalt: #F9F9F9ff; // outline border color
// $battleship-gray: #8D8D8Dff; // secondary text color
// $raisin-black: #1F2029ff; // primary color

// --raisin-black: #1F2029ff; //backgroup
// --raisin-black-2: #1F2029ff; // outline border color
// --davys-gray: #585962ff;  // secondary text color
// --seasalt: #F8F8F9ff; // primary color
export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#F8F8F9ff",
            // contrastText: "#000",
        },
        secondary: {
            main: "#585962ff",
        },
        background: {
            default: "#1F2029ff",
        },
    },
});
