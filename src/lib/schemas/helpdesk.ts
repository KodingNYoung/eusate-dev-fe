import { z } from "zod"

export const addCommentSchema = z.object({
  message: z.string().min(1, "This is a required field"),
})
