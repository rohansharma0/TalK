export const SOCKET_EVENTS = {
    CONNECT: "connect",
    CONNECT_USER: "connect:user",
    DISCONNECT: "disconnect",
    MESSAGE_SEND: "message:send",
    MESSAGE_RECEIVE: "message:receive",
    GET_PUBLIC_KEY: "get:public:key",
} as const;
