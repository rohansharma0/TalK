import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import { CustomThemeProvider } from "./context/ThemeContext";
import Router from "./routes/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const App = () => {
    const queryClient = new QueryClient();
    return (
        <CustomThemeProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <SocketProvider>
                        <Router />
                    </SocketProvider>
                </AuthProvider>
            </QueryClientProvider>
        </CustomThemeProvider>
    );
};
