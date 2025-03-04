import {
  getAuthConfiguration,
  getDevSpaceFunctions,
  getParamsCodenames,
} from "@/lib/data/dev-space"
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

  return { ...result, configs: result.data }
}

export const useDevSpaceFunctions = () => {
  const toast = useToast()
  const result = useQuery({
    queryKey: QUERY_FN_KEYS.DEV_SPACE_FUNCTIONS,
    queryFn: async () => await getDevSpaceFunctions(),
  })

  if (result.isError) {
    toast.show(result.error.message, { type: "error" })
  }

  return { ...result, functions: result.data }
}
export const useParamsCodenames = () => {
  const toast = useToast()
  const result = useQuery({
    queryKey: QUERY_FN_KEYS.CODENAMES,
    queryFn: async () => await getParamsCodenames(),
  })

  if (result.isError) {
    toast.show(result.error.message, { type: "error" })
  }

  return { ...result, codenames: result.data?.code_names }
}
