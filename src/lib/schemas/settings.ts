import { z } from "zod"

export const generateAPIKeySchema = z.object({
  name: z
    .string()
    .min(3, "Name should not be less than 3 characters")
    .min(1, "Name is required"),
})
