import express from "express";
import * as RequestController from "../controllers/request.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/requests", authenticateUser, RequestController.getRequests);
router.post("/request", authenticateUser, RequestController.sendRequest);
router.post(
    "/remove-request",
    authenticateUser,
    RequestController.removeRequest
);
router.get(
    "/request",
    authenticateUser,
    RequestController.getReceiveRequestCount
);

export default router;
