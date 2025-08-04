import { Request, Response } from "express";
import { errorResponse, successResponse } from "../types/ApiResponse";
import { logger } from "../utils/logger";
import * as UserService from "../services/user.service";

export const seachUserByUsername = async (req: Request, res: Response) => {
    try {
        const q = req?.query.q;
        if (!q || typeof q !== "string") {
            return res
                .status(400)
                .json(errorResponse(400, "Query parameter 'q' is required."));
        }
        const result = await UserService.searchUser(q);
        res.status(200).json(successResponse(200, "Data found.", result));
    } catch (err: any) {
        logger.error("Something went wrong!", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};

export const getFriends = async (req: Request, res: Response) => {
    try {
        const result = await UserService.getFriends(req.user.userId);
        res.status(200).json(successResponse(200, "Friends found.", result));
    } catch (err: any) {
        logger.error("Something went wrong!", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};

export const sendRequest = async (req: Request, res: Response) => {
    try {
        const result = await UserService.sendRequest(req.body, req.user.userId);
        res.status(200).json(
            successResponse(200, "Request send successfully.", result)
        );
    } catch (err: any) {
        logger.error("Something went wrong!", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};

export const removeRequest = async (req: Request, res: Response) => {
    try {
        const result = await UserService.removeRequest(
            req.body,
            req.user.userId
        );
        res.status(200).json(
            successResponse(200, "Request removed successfully.", result)
        );
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

export const getRequests = async (req: Request, res: Response) => {
    try {
        const result = await UserService.getRequests(req.user.userId);
        res.status(200).json(successResponse(200, "Request found.", result));
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
        logger.error("Something went wrong!", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};
