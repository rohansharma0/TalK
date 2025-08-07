import "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Palette {
        sidebar?: {
            button: {
                color: string;
                activeColor: string;
            };
        };
    }

    interface PaletteOptions {
        sidebar?: {
            button: {
                color: string;
                activeColor: string;
            };
        };
    }
}
