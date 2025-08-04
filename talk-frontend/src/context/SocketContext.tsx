import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { Socket } from "socket.io-client";
import socket from "../socket/socket";

interface SocketContextType {
    socket: Socket;
    privateKey: CryptoKey | null;
    setPrivateKey: (key: CryptoKey) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const [privateKey, setPrivateKey] = useState<CryptoKey | null>(null);

    useEffect(() => {
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, privateKey, setPrivateKey }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context)
        throw new Error("useSocket must be used inside SocketProvider");
    return context;
};
