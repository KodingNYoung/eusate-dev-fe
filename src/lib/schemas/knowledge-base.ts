import { KnowledgeSourceTags } from "@/utils/enums"
import { string, z } from "zod"

export const selectResourcesTagsSchema = z.object({
  tag: z.nativeEnum(KnowledgeSourceTags),
})

export const addFAQSchema = z.object({
  question: z
    .string()
    .min(2, "Field should not be less than 2 characters")
    .min(1, "This field is required"),
  answer: z
    .string()
    .min(2, "Field should not be less than 2 characters")
    .min(1, "This field is required"),
})

export const validateUrlSchema = z.object({
  url: z
    .string()
    .url({ message: "Enter a valid url" })
    .min(1, "This field is required"),
})

export const validateSubdomainUrlSchema = (domain: string) =>
  z.object({
    url: z
      .string()
      .includes(domain, { message: "Domains don't match" })
      .url({ message: "Enter a valid url" })
      .min(1, "This field is required"),
  })
