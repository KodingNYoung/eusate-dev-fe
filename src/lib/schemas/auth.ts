import { EMAIL_REGEX_PATTERNS } from "@/utils/constants"
import { TwoFAMethods } from "@/utils/enums"
import { z } from "zod"

// SIGN UP
export const signupPayloadSchema = z.object({
  email: z
    .string()
    .regex(EMAIL_REGEX_PATTERNS, {
      message: "Personal emails address are not accepted",
    })
    .email("Invalid email address")
    .min(1, "This is a required field"),
  username: z
    .string()
    .min(3, "Field should not be less than 3 characters")
    .min(1, "This is a required field"),
  organisation_name: z
    .string()
    .min(2, "Field should not be less than 2 characters")
    .min(1, "This is a required field"),
})

// 2FA SETUP
export const setup2faPayloadSchema = z.object({
  method: z.nativeEnum(TwoFAMethods),
  email: z.string().email("Invalid email").min(1, "This is a required field"),
})

// SEND CODE
export const sendCodePayloadSchema = z.object({
  code: z
    .string()
    .min(6, { message: "2FA code must be 6-digits" })
    .min(1, "This is a required field"),
})

// INITIATE LOGIN
export const initiateLoginPayloadSchema = z.object({
  email: z.string().email("Invalid email").min(1, "This is a required field"),
})

// ONBOARDING SETUP
export const onboardingSetupPayloadSchema = z.object({
  company_size: z.string().min(1, "This is a required field"),
  sector: z.string().min(1, "This is a required field"),
  use_case: z.string().min(1, "This is a required field"),
})
