import { io, type Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const socket: Socket = io(SOCKET_URL, {
    autoConnect: false,
    withCredentials: true,
    transports: ["websocket"],
    auth: {
        token: "",
    },
});

export const generateKeyPair = async () => {
    return await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
    );
};

export const exportPublicKey = async (key: CryptoKey) => {
    const exported = await window.crypto.subtle.exportKey("spki", key);
    return btoa(String.fromCharCode(...new Uint8Array(exported)));
};

export const importPublicKey = async (b64: string) => {
    const binary = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    return await window.crypto.subtle.importKey(
        "spki",
        binary,
        { name: "RSA-OAEP", hash: "SHA-256" },
        true,
        ["encrypt"]
    );
};

export const encryptMessage = async (msg: string, publicKey: CryptoKey) => {
    const encoded = new TextEncoder().encode(msg);
    const encrypted = await window.crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        publicKey,
        encoded
    );
    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
};

export const decryptMessage = async (b64: string, privateKey: CryptoKey) => {
    const binary = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const decrypted = await window.crypto.subtle.decrypt(
        { name: "RSA-OAEP" },
        privateKey,
        binary
    );
    return new TextDecoder().decode(decrypted);
};

export default socket;
