import express from "express";
import * as AuthController from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

const router = express.Router();

router.post(
    "/register",
    validateRequest(registerSchema),
    AuthController.register
);
router.post("/login", validateRequest(loginSchema), AuthController.login);

export default router;
