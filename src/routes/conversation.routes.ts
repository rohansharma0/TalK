import express from "express";
import * as ConversationController from "../controllers/conversation.controller";

import { authenticateUser } from "../middlewares/auth.middleware";
import { groupConversationSchema } from "../schemas/conversation.schema";
import { validateRequest } from "../middlewares/validateRequest";

const router = express.Router();

router.get(
    "/conversations",
    authenticateUser,
    ConversationController.getConversations
);

router.post(
    "/group",
    authenticateUser,
    validateRequest(groupConversationSchema),
    ConversationController.createGroupConversation
);

router.post(
    "/group/make-admin",
    authenticateUser,
    ConversationController.makeGroupAdmin
);
router.post(
    "/group/remove-admin",
    authenticateUser,
    ConversationController.removeGroupAdmin
);

export default router;
