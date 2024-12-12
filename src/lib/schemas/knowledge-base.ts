import { KnowledgeSourceTags } from "@/utils/enums"
import { z } from "zod"

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
