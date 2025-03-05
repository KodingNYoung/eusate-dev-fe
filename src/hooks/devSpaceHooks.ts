import { toaster } from "@/components/molecules/Toast"
import {
  getAuthConfiguration,
  getDevSpaceFunctions,
  getParamsCodenames,
} from "@/lib/data/dev-space"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { useQuery } from "@tanstack/react-query"

export const useAuthConfig = () => {
  const result = useQuery({
    queryKey: QUERY_FN_KEYS.AUTH_CONFIG,
    queryFn: async () => await getAuthConfiguration(),
  })

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return { ...result, configs: result.data }
}

export const useDevSpaceFunctions = () => {
  const result = useQuery({
    queryKey: QUERY_FN_KEYS.DEV_SPACE_FUNCTIONS,
    queryFn: async () => await getDevSpaceFunctions(),
  })

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return { ...result, functions: result.data }
}
export const useParamsCodenames = () => {
  const result = useQuery({
    queryKey: QUERY_FN_KEYS.CODENAMES,
    queryFn: async () => await getParamsCodenames(),
  })

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return { ...result, codenames: result.data?.code_names }
}
