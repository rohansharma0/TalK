import { Request, Response } from "express";
import * as ConversationService from "../services/conversation.service";
import { errorResponse, successResponse } from "../types/ApiResponse";
import { logger } from "../utils/logger";

export const getConversations = async (req: Request, res: Response) => {
    try {
        const result = await ConversationService.getConversations(
            req.user.userId
        );
        res.status(200).json(
            successResponse(200, "Conversations found.", result)
        );
    } catch (err: any) {
        logger.error("Something went wrong!", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};

export const createGroupConversation = async (req: Request, res: Response) => {
    try {
        const result = await ConversationService.createGroupConversation(
            req.body,
            {
                createdBy: req.user.userId,
            }
        );
        res.status(200).json(
            successResponse(200, "Conversation created successfully.", result)
        );
    } catch (err: any) {
        logger.error("Something went wrong!", { message: err.message });
        res.status(400).json(errorResponse(400, err.message));
    }
};

export const makeGroupAdmin = async (req: Request, res: Response) => {};

export const removeGroupAdmin = async (req: Request, res: Response) => {};
