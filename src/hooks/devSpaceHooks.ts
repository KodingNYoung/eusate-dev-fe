import { getAuthConfiguration } from "@/lib/data/dev-space"
import { useToast } from "@/providers/toastProviders"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { useQuery } from "@tanstack/react-query"

export const useAuthConfig = () => {
  const toast = useToast()
  const result = useQuery({
    queryKey: QUERY_FN_KEYS.AUTH_CONFIG,
    queryFn: async () => await getAuthConfiguration(),
  })

  if (result.isError) {
    toast.show(result.error.message, { type: "error" })
  }

  return { ...result, config: result.data?.[0] }
}
