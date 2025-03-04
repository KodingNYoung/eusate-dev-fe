import {
  AuthLocation,
  AuthType,
  FunctionMethods,
  FunctionParamType,
  ParamsProvidedBy,
} from "@/components/views/dev-space/utils"
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

const urlParamRegex = /\{([a-zA-Z][a-zA-Z0-9_]*)\}/g // Extract parameters
const domainRegex =
  /^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/

export const generalConfigStep = z.object({
  method: z.nativeEnum(FunctionMethods, {
    message: "Please, select a valid method",
  }),
  name: z
    .string()
    .min(2, "Function name should not be less than 2 characters")
    .min(1, "Function name is required"),
  description: z
    .string()
    .min(2, "Description should not be less than 2 characters")
    .min(1, "Description is required"),
  endpoint_url: z
    .string()
    .url("Enter a valid endpoint URL")
    .min(1, "Endpoint URL is required")
    .regex(domainRegex, "Invalid base url")
    // ✅ Check for balanced curly brackets
    .refine((url) => {
      let count = 0
      for (let i = 0; i < url.length; i++) {
        if (url[i] === "{") count++
        if (url[i] === "}") count--
        if (count < 0) return false // Closing bracket before opening
      }
      return count === 0 // Ensure all brackets are closed
    }, "URL contains unbalanced curly brackets")
    // ✅ Ensure variable names inside `{}` are valid
    .refine((url) => {
      const matches = url.match(urlParamRegex)
      return matches
        ? matches.every((match) => /^\{[a-zA-Z][a-zA-Z0-9_]*\}$/.test(match))
        : true
    }, "Invalid variable names inside curly brackets")
    // ✅ Ensure `{}` is not in the protocol or domain
    .refine((url) => {
      const beforeFirstSlash = url.split("/")[2] // Extract domain part
      return !/\{.*\}/.test(beforeFirstSlash) // `{}` must not appear in domain
    }, "Placeholders cannot be used in the domain or protocol")
    // ✅ Ensure `{}` is only used in the path or query string
    .refine((url) => {
      return url.match(urlParamRegex)?.every(() => {
        return /\/\{.*\}/.test(url) || /[?&]\w+=\{.*\}/.test(url)
      })
    }, "Placeholders must be in the path or query parameters"),
})

export const paramFieldSchema = z.object({
  param: z
    .string()
    .min(2, "Function name should not be less than 2 characters")
    .min(1, "Function name is required"),
  description: z
    .string()
    .min(2, "Description should not be less than 2 characters")
    .min(1, "Description is required"),
  provided_by: z.nativeEnum(ParamsProvidedBy, {
    message: "Please select a valid choice",
  }),
  type: z.nativeEnum(FunctionParamType, {
    message: "Please select a valid type",
  }),
  value: z.string().optional(),
  code_name: z.string().optional(),
})
