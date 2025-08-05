import express from "express";
import * as UserController from "../controllers/user.controller";
import * as ConversationController from "../controllers/conversation.controller";

import { authenticateUser } from "../middlewares/auth.middleware";
import { groupConversationSchema } from "../schemas/conversation.schema";
import { validateRequest } from "../middlewares/validateRequest";

const router = express.Router();

router.get("/search", authenticateUser, UserController.seachUserByUsername);

router.post("/user", authenticateUser, UserController.updateUser);

router.post("/password", authenticateUser, UserController.changePassword);

router.get("/friends", authenticateUser, UserController.getFriends);

router.post("/friend", authenticateUser, UserController.makeFriend);

router.post("/remove-friend", authenticateUser, UserController.removeFriend);

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
