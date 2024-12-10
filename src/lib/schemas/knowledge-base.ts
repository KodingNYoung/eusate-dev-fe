import { KnowledgeSourceTags } from "@/utils/enums"
import { z } from "zod"

export const selectResourcesTagsSchema = z.object({
  tag: z.nativeEnum(KnowledgeSourceTags),
})
