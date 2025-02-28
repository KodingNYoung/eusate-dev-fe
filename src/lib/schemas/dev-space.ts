import { AuthLocation, AuthType } from "@/components/views/dev-space/utils"
import { z } from "zod"

export const authConfigStep1 = z.object({
  login_url: z
    .string()
    .url({ message: "Enter a valid url" })
    .min(1, "Login endpoint is required"),
})

export const authConfigWithQueryAuth = z.object({
  auth_location: z.nativeEnum(AuthLocation, {
    message: "Please select a valid choice",
  }),
  auth_type: z.nativeEnum(AuthType, {
    message: "Please select a valid choice",
  }),
  query_name: z
    .string()
    .min(2, "Query name should not be less than 2 characters")
    .min(1, "Query name is required"),
})

export const authConfigWithHeaderAuth = z.object({
  auth_location: z.nativeEnum(AuthLocation, {
    message: "Please, select a valid choice",
  }),
  auth_type: z.nativeEnum(AuthType, {
    message: "Please, select a valid choice",
  }),
  header_name: z
    .string()
    .min(2, "Header name should not be less than 2 characters")
    .min(1, "Header name is required"),
  header_value: z
    .string()
    .min(2, "Header value should not be less than 2 characters")
    .min(1, "Header value is required"),
})
