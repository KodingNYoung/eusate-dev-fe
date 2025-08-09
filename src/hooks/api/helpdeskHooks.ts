"use client"

import { toaster } from "@/components/molecules/Toast"
import {
  getHDSummaryTopCardsData,
  getTicketActivities,
  getTicketChats,
  getTicketComments,
  getTicketDetails,
  GetTicketOptions,
  getTicketPrioties,
  getTickets,
} from "@/lib/data/helpdesk"
import { OverviewFilterOptions } from "@/lib/data/overview"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { Ticket } from "@/utils/types"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

export const useTickets = (filters?: Omit<GetTicketOptions, "page">) => {
  const result = useInfiniteQuery({
    queryKey: [...QUERY_FN_KEYS.TICKETS, filters],
    queryFn: async ({ pageParam = 0 }) =>
      await getTickets({ page: pageParam, ...filters }),
    initialPageParam: 1,
    getNextPageParam: (_, pages) => {
      return pages.length + 1
    },
  })

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return result
}

export const useTicketDetails = (id: string, ticket?: Ticket) => {
  const result = useQuery({
    queryKey: [...QUERY_FN_KEYS.TICKETS, id],
    queryFn: async () => getTicketDetails(id),
    placeholderData: ticket,
  })

  console.log(result.data)

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return result
}

export const useTicketComments = (id: string) => {
  const result = useQuery({
    queryKey: [...QUERY_FN_KEYS.TICKET_COMMENTS, id],
    queryFn: async () => getTicketComments(id),
  })

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return result
}
export const useTicketActivities = (id: string) => {
  const result = useQuery({
    queryKey: [...QUERY_FN_KEYS.TICKET_ACTIVITIES, id],
    queryFn: async () => getTicketActivities(id),
  })

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return result
}

export const useTicketChats = (id: string) => {
  const result = useQuery({
    queryKey: [...QUERY_FN_KEYS.TICKET_CHAT, id],
    queryFn: async () => await getTicketChats(id),
    retry: 0,
  })

  return result
}

// SUMMARY
export const useHDSummaryTopCards = (filter: OverviewFilterOptions) => {
  const result = useQuery({
    queryKey: [...QUERY_FN_KEYS.HELPDESK_SUMMARY, "top-cards", { filter }],
    queryFn: async () => await getHDSummaryTopCardsData(filter),
  })

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return result
}
export const useHDSummaryTicketPriorities = (filter: OverviewFilterOptions) => {
  const result = useQuery({
    queryKey: [
      ...QUERY_FN_KEYS.HELPDESK_SUMMARY,
      "ticket-priorities",
      { filter },
    ],
    queryFn: async () => await getTicketPrioties(filter),
  })

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return result
}
