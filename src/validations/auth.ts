import { TwoFAMethods } from "@/utils/enums"
import { z } from "zod"

// SIGN UP
export const signupPayloadSchema = z.object({
  email: z
    .string({ required_error: "This is a required field" })
    .min(1)
    .email("Invalid email"),
  username: z.string().min(3, "Field should not be less than 3 characters"),
  organisation_name: z
    .string({ required_error: "This is a required field" })
    .min(2, "Field should not be less than 2 characters"),
})

// 2FA SETUP
export const setup2faPayloadSchema = z.object({
  method: z.nativeEnum(TwoFAMethods),
})

// SEND CODE
export const sendCodePayloadSchema = z.object({
  code: z
    .string({ required_error: "This is a required field" })
    .min(6, { message: "2FA code must be 6-digits" }),
})

// INITIATE LOGIN
export const initiateLoginPayloadSchema = z.object({
  email: z
    .string({ required_error: "This is a required field" })
    .email("Invalid email"),
})

// ONBOARDING SETUP
export const onboardingSetupPayloadSchema = z.object({
  company_size: z
    .string({ required_error: "This is a required field" })
    .min(1, { message: "This is a required field" }),
  sector: z
    .string({ required_error: "This is a required field" })
    .min(1, { message: "This is a required field" }),
  use_case: z
    .string({ required_error: "This is a required field" })
    .min(1, { message: "This is a required field" }),
})
