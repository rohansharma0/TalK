import express from "express";
import * as UserController from "../controllers/user.controller";

import { authenticateUser } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/search", authenticateUser, UserController.seachUserByUsername);
router.post("/user", authenticateUser, UserController.updateUser);
router.post("/password", authenticateUser, UserController.changePassword);
router.get("/check", UserController.isUsernameAvailable);

export default router;
