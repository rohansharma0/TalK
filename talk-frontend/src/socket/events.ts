export const SOCKET_EVENTS = {
    CONNECT: "connect",
    CONNECT_USER: "connect:user",
    USER_STATUS: "user:status",
    FORCE_LOGOUT: "force:logout",
    DISCONNECT: "disconnect",
    MESSAGE_SEND: "message:send",
    MESSAGE_RECEIVE: "message:receive",
    GET_PUBLIC_KEY: "get:public:key",
} as const;
