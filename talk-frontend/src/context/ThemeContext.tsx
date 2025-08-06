import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { createContext, useContext, useMemo, useState } from "react";
import { darkTheme, lightTheme } from "../utils/theme";

const ThemeModeContext = createContext({
    toggleColorMode: () => {},
});

export const useThemeMode = () => useContext(ThemeModeContext);

export const CustomThemeProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        return (localStorage.getItem("theme") as "light" | "dark") || "light";
    });

    const toggleColorMode = () => {
        setTheme((prev) => {
            const next = prev === "light" ? "dark" : "light";
            localStorage.setItem("theme", next);
            return next;
        });
    };

    const currentTheme = useMemo(
        () => (theme === "light" ? lightTheme : darkTheme),
        [theme]
    );

    return (
        <ThemeModeContext.Provider value={{ toggleColorMode }}>
            <ThemeProvider theme={currentTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeModeContext.Provider>
    );
};
