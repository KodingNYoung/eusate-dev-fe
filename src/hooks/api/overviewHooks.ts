"use client"

import { toaster } from "@/components/molecules/Toast"
import {
  getChannelDistribution,
  getOpenTicketOverview,
  getOverviewTopCardsData,
  getResourceTypeOverview,
  OverviewFilterOptions,
} from "@/lib/data/overview"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { useQuery } from "@tanstack/react-query"

export const useOpenTicketsOverview = (filter: OverviewFilterOptions) => {
  const result = useQuery({
    queryKey: [...QUERY_FN_KEYS.OVERVIEW, "open-ticket", filter],
    queryFn: async () => await getOpenTicketOverview(filter),
  })

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return result
}
export const useOverviewTopCards = (filter: OverviewFilterOptions) => {
  const result = useQuery({
    queryKey: [...QUERY_FN_KEYS.OVERVIEW, "top-cards-data", filter],
    queryFn: async () => await getOverviewTopCardsData(filter),
  })

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return result
}
export const useResourceTypeOverview = (filter: OverviewFilterOptions) => {
  const result = useQuery({
    queryKey: [...QUERY_FN_KEYS.OVERVIEW, "resource-type-overview", filter],
    queryFn: async () => await getResourceTypeOverview(filter),
  })

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return result
}
export const useChannelDistribution = (filter: OverviewFilterOptions) => {
  const result = useQuery({
    queryKey: [...QUERY_FN_KEYS.OVERVIEW, "channel-distribution", filter],
    queryFn: async () => await getChannelDistribution(filter),
  })

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return result
}
