import { toaster } from "@/components/molecules/Toast"
import { getAPiKeys } from "@/lib/data/settings"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { useQuery } from "@tanstack/react-query"

export const useApiKeys = () => {
  const result = useQuery({
    queryKey: QUERY_FN_KEYS.API_KEYS,
    queryFn: async () => await getAPiKeys(),
  })

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return { ...result, apiKeys: result ? result?.data : [] }
}
