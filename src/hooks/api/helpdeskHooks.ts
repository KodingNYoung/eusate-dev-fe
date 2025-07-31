"use client"

import { toaster } from "@/components/molecules/Toast"
import {
  getTicketChats,
  getTicketComments,
  getTicketDetails,
  GetTicketOptions,
  getTickets,
} from "@/lib/data/helpdesk"
import { QUERY_FN_KEYS } from "@/utils/constants"
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

export const useTicketDetails = (id: string) => {
  const result = useQuery({
    queryKey: [...QUERY_FN_KEYS.TICKET, id],
    queryFn: async () => getTicketDetails(id),
  })

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

export const useTicketChats = (id: string) => {
  const result = useQuery({
    queryKey: [...QUERY_FN_KEYS.TICKET_CHAT, id],
    queryFn: async () => await getTicketChats(id),
    retry: 0,
  })

  return result
}
