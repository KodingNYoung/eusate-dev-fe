import { toaster } from "@/components/molecules/Toast"
import {
  getKnowledgeSources,
  GetKnowledgeSourcesOptions,
} from "@/lib/data/knowledge-base"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { useQuery } from "@tanstack/react-query"

export const useKnowledgeBaseResources = (
  options: GetKnowledgeSourcesOptions
) => {
  const result = useQuery({
    queryKey: [...QUERY_FN_KEYS.KNOWLEDGE_BASE_RESOURCES, options],
    queryFn: async () =>
      await getKnowledgeSources({ ...options, page_size: 6 }),
  })

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return result
}
