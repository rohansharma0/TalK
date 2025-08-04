import jwt from "jsonwebtoken";

export const generateToken = (payload: object) => {
    return jwt.sign(payload, process.env.TOKEN_SECRET!, {
        expiresIn: "1d",
    });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.TOKEN_SECRET!);
};
