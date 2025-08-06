import { Request, Response } from "express";
import { errorResponse, successResponse } from "../types/ApiResponse";
import { logger } from "../utils/logger";
import * as UserService from "../services/user.service";

export const getFriends = async (req: Request, res: Response) => {
    try {
        const result = await UserService.getFriends(req.user.userId);
        res.status(200).json(successResponse(200, "Friends found.", result));
    } catch (err: any) {
        logger.error("Something went wrong!", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};

export const makeFriend = async (req: Request, res: Response) => {
    try {
        const result = await UserService.makeFriend(req.body, req.user.userId);
        res.status(200).json(
            successResponse(
                200,
                "Friend added and conversation created successfully.",
                result
            )
        );
    } catch (err: any) {
        logger.error("Something went wrong!", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};

export const removeFriend = async (req: Request, res: Response) => {
    try {
        const result = await UserService.removeFriend(
            req.body,
            req.user.userId
        );
        res.status(200).json(
            successResponse(200, "Friend removed successfully.", result)
        );
    } catch (err: any) {
        logger.error("Friend removed: Something went wrong!", {
            message: err.message,
        });
        res.status(400).json(errorResponse(400, err.message));
    }
};
