import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { errorResponse } from "../types/ApiResponse";

export const validateRequest =
    (schema: ZodSchema<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res
                .status(400)
                .json(
                    errorResponse(
                        400,
                        "Validation error: " +
                            JSON.stringify(result.error.flatten().fieldErrors)
                    )
                );
        }
        req.body = result.data;
        next();
    };
