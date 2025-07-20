import { KnowledgeSourceTags } from "@/utils/enums"
import { z } from "zod"

export const selectResourcesTagsSchema = z.object({
  tag: z.nativeEnum(KnowledgeSourceTags),
})

export const selectArticleMethodSchema = z.object({
  method: z.enum(["text"]),
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

export const createArticleSchema = z.object({
  title: z
    .string()
    .min(2, "Field should not be less than 2 characters")
    .min(1, "This field is required"),
  content: z
    .string()
    .min(2, "Field should not be less than 2 characters")
    .min(1, "This field is required"),
})
export const editResourceContentSchema = z.object({
  title: z
    .string()
    .min(2, "Field should not be less than 2 characters")
    .min(1, "This field is required"),
  content: z
    .string()
    .min(2, "Field should not be less than 2 characters")
    .min(1, "This field is required"),
  id: z.string().min(1, "This field is required"),
  tag: z.nativeEnum(KnowledgeSourceTags),
})
