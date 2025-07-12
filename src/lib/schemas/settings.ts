import { z } from "zod"

export const generateAPIKeySchema = z.object({
  name: z
    .string()
    .min(3, "Name should not be less than 3 characters")
    .min(1, "Name is required"),
})

export const inviteMemberSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is a required field"),
  permissions: z
    .string({ message: "Selected at least one permission" })
    .uuid("Select at least one permission")
    .min(1, "Select at least one permission"),
})
export const manageUserSchema = z.object({
  permissions: z
    .string({ message: "Selected at least one permission" })
    .uuid("Select at least one permission")
    .min(1, "Select at least one permission"),
})
