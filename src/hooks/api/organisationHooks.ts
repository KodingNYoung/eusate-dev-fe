"use client"

import { toaster } from "@/components/molecules/Toast"
import { getOwnedOrganisation } from "@/lib/data/organisation"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { useQuery } from "@tanstack/react-query"

export const useOwnedOrganisation = () => {
  const result = useQuery({
    queryKey: QUERY_FN_KEYS.OWNED_ORGANISATION,
    queryFn: async () => await getOwnedOrganisation(),
  })

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return result
}
