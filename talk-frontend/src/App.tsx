import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import Router from "./routes/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const App = () => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <SocketProvider>
                    <Router />
                </SocketProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
};
