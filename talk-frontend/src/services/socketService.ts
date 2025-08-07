import { SOCKET_EVENTS } from "../socket/events";
import socket, {
    encryptMessage,
    exportPublicKey,
    generateKeyPair,
    importPublicKey,
} from "../socket/socket";
import type { IMessage } from "../types/Message";

export const connectSocket = async (
    token: string
): Promise<{ info: string; privateKey: CryptoKey }> => {
    socket.auth = { token };
    socket.connect();

    return new Promise((resolve, reject) => {
        socket.once(SOCKET_EVENTS.CONNECT, async () => {
            try {
                const { publicKey, privateKey } = await generateKeyPair();
                const exported = await exportPublicKey(publicKey);
                socket.emit(
                    SOCKET_EVENTS.CONNECT_USER,
                    {
                        publicKey: exported,
                    },
                    (res: { info: string }) => {
                        resolve({ info: res.info, privateKey });
                    }
                );
            } catch (err) {
                reject(err);
            }
        });

        socket.once("connect_error", (err) => {
            reject(err);
        });
    });
};

export const disconnectSocket = () => {
    if (socket.connected) socket.disconnect();
};

export const getPublicKey = async (userId: string) => {
    return new Promise<CryptoKey | null>((resolve, reject) => {
        socket.emit(
            SOCKET_EVENTS.GET_PUBLIC_KEY,
            userId,
            async (res: string | null) => {
                try {
                    if (!res) return resolve(null);
                    const importedKey = await importPublicKey(res);
                    console.log(userId + "----" + res);

                    resolve(importedKey);
                } catch (err) {
                    reject(err);
                }
            }
        );
    });
};

export const sendMessage = async (data: IMessage, publicKey: CryptoKey) => {
    const encryptedMessage = await encryptMessage(data.data, publicKey);
    const message: IMessage = { ...data, data: encryptedMessage };
    socket.emit(SOCKET_EVENTS.MESSAGE_SEND, message);
};

export const receiveMessage = (callback: (message: IMessage) => void) => {
    socket.on(SOCKET_EVENTS.MESSAGE_RECEIVE, (encryptedMessage: IMessage) => {
        callback(encryptedMessage);
    });
};

export const removeMessageListener = (
    callback: (message: IMessage) => void
) => {
    socket.off(SOCKET_EVENTS.MESSAGE_RECEIVE, callback);
};
