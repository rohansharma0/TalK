import { Request, Response } from "express";
import { errorResponse, successResponse } from "../types/ApiResponse";
import { logger } from "../utils/logger";
import * as UserService from "../services/user.service";

export const getRequests = async (req: Request, res: Response) => {
    try {
        const result = await UserService.getRequests(req.user.userId);
        result?.requests.length;
        res.status(200).json(successResponse(200, "Requests found.", result));
    } catch (err: any) {
        logger.error("Something went wrong!", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};

export const getReceiveRequestCount = async (req: Request, res: Response) => {
    try {
        const result = await UserService.getReceiveRequestCount(
            req.user.userId
        );
        res.status(200).json(
            successResponse(200, "Receive request count fetched.", result)
        );
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
