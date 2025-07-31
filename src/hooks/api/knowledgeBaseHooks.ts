"use client"

import { toaster } from "@/components/molecules/Toast"
import {
  getKnowledgeSource,
  getKnowledgeSources,
  GetKnowledgeSourcesOptions,
} from "@/lib/data/knowledge-base"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { KnowledgeSourceTags } from "@/utils/enums"
import { useQuery } from "@tanstack/react-query"

export const useKnowledgeBaseResources = (
  options: GetKnowledgeSourcesOptions
) => {
  const result = useQuery({
    queryKey: [...QUERY_FN_KEYS.KNOWLEDGE_BASE_RESOURCES, options],
    queryFn: async () => await getKnowledgeSources(options),
  })

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return result
}

export const useKnowledgeBaseResource = (
  id?: string,
  tag?: KnowledgeSourceTags
) => {
  const result = useQuery({
    queryKey: [...QUERY_FN_KEYS.KNOWLEDGE_BASE_RESOURCES, tag, id],
    queryFn: async () => await getKnowledgeSource(id, tag),
    enabled: Boolean(id && tag),
  })

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return result
}
