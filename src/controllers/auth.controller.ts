import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";
import * as UserService from "../services/user.service";
import { errorResponse, successResponse } from "../types/ApiResponse";
import { logger } from "../utils/logger";

export const register = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.register(req.body);
        res.status(201).json(
            successResponse(201, "User registered successfully.", result)
        );
    } catch (err: any) {
        logger.error("Register Error", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.login(req.body);
        res.status(200).json(
            successResponse(201, "User logged in successfully.", result)
        );
    } catch (err: any) {
        logger.error("Login Error", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};

export const isUsernameAvailable = async (req: Request, res: Response) => {
    try {
        const username = req?.query.username;
        if (!username || typeof username !== "string") {
            return res
                .status(400)
                .json(
                    errorResponse(
                        400,
                        "Query parameter 'username' is required."
                    )
                );
        }
        const result = await UserService.isUsernameAvailable(username);
        res.status(200).json(result);
    } catch (err: any) {
        logger.error("Login Error", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};
