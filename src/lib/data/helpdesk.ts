"use server"

import { ERROR_CAUSES } from "@/utils/constants"
import { sendAuthRequest } from "../request"
import { getSession } from "../sessions"
import {
  ComparisonCardDataType,
  DBResource,
  MessageType,
  Ticket,
  TicketActivity,
  TicketComment,
  UserType,
} from "@/utils/types"
import {
  TicketPriority,
  TicketStatus,
  UserTemperament,
} from "@/components/views/help-desk/utils"
import { objToQuery } from "@/utils/helpers"
import { MessageSenders } from "@/utils/enums"
import { OverviewFilterOptions } from "./overview"

export type GetTicketsResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Ticket[]
}
export type GetTicketOptions = {
  page: number
  page_size?: number
  priority?: TicketPriority
  status?: TicketStatus
  temperaments?: UserTemperament
  date_created?: string
  date_updated?: string
  assigned_to_me?: boolean
  ai_tickets?: boolean
  start_date?: string
  end_date?: string
}
export const getTickets = async (options: GetTicketOptions) => {
  const query = objToQuery({ page_size: 15, ...options })
  const session = await getSession()
  console.log(query)
  const response = await sendAuthRequest<GetTicketsResponse>(
    `/api/v1/helpdesk/${session?.currentOrganisationId}/tickets/?${query}`
  )

  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }

  return response
}

export const getTicketDetails = async (id: string) => {
  const session = await getSession()
  const response = await sendAuthRequest<Ticket>(
    `/api/v1/helpdesk/${session?.currentOrganisationId}/tickets/${id}/`
  )

  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }

  return response
}

export const getTicketComments = async (id: string) => {
  const session = await getSession()
  const response = await sendAuthRequest<TicketComment[]>(
    `/api/v1/helpdesk/${session?.currentOrganisationId}/tickets/${id}/comments`
  )

  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }

  return response
}
export const getTicketActivities = async (id: string) => {
  const session = await getSession()
  const response = await sendAuthRequest<TicketActivity[]>(
    `/api/v1/helpdesk/${session?.currentOrganisationId}/tickets/${id}/activities`
  )

  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }

  return response
}

export type GetTicketChatsResponse = DBResource & {
  closed: boolean
  responder: MessageSenders
  ticket: string
  messages: MessageType[]
}
export const getTicketChats = async (id: string) => {
  const session = await getSession()
  const response = await sendAuthRequest<GetTicketChatsResponse>(
    `/api/v1/helpdesk/${session?.currentOrganisationId}/tickets/${id}/chat/`
  )

  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }

  return response
}

// SUMMARY
type HDSummaryTopCardData = Record<
  | "all_tickets"
  | "avg_human_response_time"
  | "avg_resolution_time"
  | "resolution_rate"
  | "csat_score",
  ComparisonCardDataType
>

export const getHDSummaryTopCardsData = async (
  options: OverviewFilterOptions
) => {
  const session = await getSession()
  const response = await sendAuthRequest<HDSummaryTopCardData>(
    `/api/v1/helpdesk/${session?.currentOrganisationId}/dashboard/ticket-metrics/?start_date=${options.start_date}&end_date=${options.end_date}`
  )
  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }

  return response
}

type TicketPrioritiesResponse = {
  total: number
  start_datetime: string
  end_datetime: string
  data: { priority: TicketPriority; count: number; percentage: number }[]
}
export const getTicketPrioties = async (options: OverviewFilterOptions) => {
  const session = await getSession()
  const response = await sendAuthRequest<TicketPrioritiesResponse>(
    `/api/v1/helpdesk/${session?.currentOrganisationId}/dashboard/ticket-priority/?start_date=${options.start_date}&end_date=${options.end_date}`
  )
  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }

  return response
}
export const getTicketVolumes = async (options: OverviewFilterOptions) => {
  const session = await getSession()
  const response = await sendAuthRequest<Record<string, number>>(
    `/api/v1/helpdesk/${session?.currentOrganisationId}/dashboard/ticket-volume/?start_date=${options.start_date}&end_date=${options.end_date}&interval=${options.interval}`
  )
  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }

  return response
}

type HDSummaryTicketResolution = {
  data: {
    timestamp: string
    [MessageSenders.SATE]: number
    [MessageSenders.AGENT]: number
  }[]
  efficiency: {
    [MessageSenders.SATE]: number
    [MessageSenders.AGENT]: number
  }
}
export const getTicketResolution = async (options: OverviewFilterOptions) => {
  const session = await getSession()
  const response = await sendAuthRequest<HDSummaryTicketResolution>(
    `/api/v1/helpdesk/${session?.currentOrganisationId}/dashboard/ticket-res-count/?start_date=${options.start_date}&end_date=${options.end_date}&interval=${options.interval}`
  )
  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }

  return response
}
type AgentResolutionTimes = {
  start_datetime: string
  end_datetime: string
  data: (UserType & {
    avg_resolution_time_seconds: number
  })[]
}

export const getAgentResolutionTimes = async (
  options: OverviewFilterOptions
) => {
  const session = await getSession()
  const response = await sendAuthRequest<AgentResolutionTimes>(
    `/api/v1/helpdesk/${session?.currentOrganisationId}/dashboard/avg-agent-times/?start_date=${options.start_date}&end_date=${options.end_date}`
  )
  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }

  return response
}
