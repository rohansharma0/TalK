import z from "zod";

export const groupConversationSchema = z.object({
    name: z.string().min(1, "Group name can not be emply."),
    avatar: z.string().optional(),
    members: z
        .array(z.string().min(1))
        .min(2, "At least 2 members id required."),
});

export type GroupConversationInput = z.infer<typeof groupConversationSchema>;
