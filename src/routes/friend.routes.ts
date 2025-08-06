import express from "express";
import * as FriendController from "../controllers/friend.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/friends", authenticateUser, FriendController.getFriends);
router.post("/friend", authenticateUser, FriendController.makeFriend);
router.post("/remove-friend", authenticateUser, FriendController.removeFriend);

export default router;
