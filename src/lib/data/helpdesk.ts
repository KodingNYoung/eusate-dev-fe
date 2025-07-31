"use server"

import { ERROR_CAUSES } from "@/utils/constants"
import { sendAuthRequest } from "../request"
import { getSession } from "../sessions"
import { DBResource, MessageType, Ticket, TicketComment } from "@/utils/types"
import {
  TicketPriority,
  TicketStatus,
  UserTemperament,
} from "@/components/views/help-desk/utils"
import { objToQuery } from "@/utils/helpers"
import { MessageSenders } from "@/utils/enums"

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
  temperament?: UserTemperament
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
