"use server"

import {
  ChannelCountData,
  ComparisonCardDataType,
  TicketPriorityBreakdownItem,
} from "@/utils/types"
import { getSession } from "../sessions"
import { sendAuthRequest } from "../request"
import { ERROR_CAUSES } from "@/utils/constants"

export type OverviewFilterOptions = {
  start_date: string
  end_date: string
}

type GetOpenTicketOverviewResponse = {
  open_tickets: ComparisonCardDataType
  escalation_rate: ComparisonCardDataType
  ticket_priority_breakdown: {
    data: TicketPriorityBreakdownItem[]
    total: number
  }
}
export const getOpenTicketOverview = async (options: OverviewFilterOptions) => {
  const session = await getSession()
  const response = await sendAuthRequest<GetOpenTicketOverviewResponse>(
    `/api/v1/dashboard/${session?.currentOrganisationId}/open-tickets-overview/?start_date=${options.start_date}&end_date=${options.end_date}`
  )
  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }

  return response
}

type OverviewTopCardData = Record<
  | "all_tickets"
  | "ai_resolved_tickets"
  | "human_resolved_tickets"
  | "avg_ticket_complexity_score"
  | "csat_score",
  ComparisonCardDataType
>
export const getOverviewTopCardsData = async (
  options: OverviewFilterOptions
) => {
  const session = await getSession()
  const response = await sendAuthRequest<OverviewTopCardData>(
    `/api/v1/dashboard/${session?.currentOrganisationId}/tickets-metrics/?start_date=${options.start_date}&end_date=${options.end_date}`
  )
  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }

  return response
}

type ResourceTypeOverview = {
  document_count: number
  article_count: number
  link_count: number
  faq_count: number
  total_count: number
}
export const getResourceTypeOverview = async (
  options: OverviewFilterOptions
) => {
  const session = await getSession()
  const response = await sendAuthRequest<ResourceTypeOverview>(
    `/api/v1/dashboard/${session?.currentOrganisationId}/resource-type-overview/?start_date=${options.start_date}&end_date=${options.end_date}`
  )
  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }

  return response
}

type ChannelDistribution = {
  total: number
  data: ChannelCountData[]
}
export const getChannelDistribution = async (
  options: OverviewFilterOptions
) => {
  const session = await getSession()
  const response = await sendAuthRequest<ChannelDistribution>(
    `/api/v1/dashboard/${session?.currentOrganisationId}/channels-distribution/?start_date=${options.start_date}&end_date=${options.end_date}`
  )
  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }

  return response
}
