"use server"

import { TicketStatus } from "@/components/views/help-desk/utils"
import { sendAuthRequest } from "@/lib/request"
import { getSession } from "@/lib/sessions"
import { formStateResponse } from "@/utils/helpers"
import {
  AttachmentMetadata,
  FormState,
  Ticket,
  TicketComment,
} from "@/utils/types"

export const addTicketComment = async (
  state: FormState,
  formdata: FormData
) => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const { message, ticket_id } = Object.fromEntries(formdata)

  try {
    const session = await getSession()
    const response = await sendAuthRequest<TicketComment>(
      "/api/v1/helpdesk/comments/",
      { message, ticket_id, organisation_id: session?.currentOrganisationId },
      { method: "POST" }
    )

    if ("shouldAuthenticate" in response)
      throw new Error("Session expired, log in again")

    return successResponse("", "", response)
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
}

type UploadAttachmentResponse = Omit<AttachmentMetadata, "loading">
export const uploadTicketAttachment = async (formdata: FormData) => {
  const { successResponse, errorResponse } =
    formStateResponse<UploadAttachmentResponse>()

  try {
    const session = await getSession()
    const response = await sendAuthRequest<UploadAttachmentResponse>(
      `/api/v1/helpdesk/${session?.currentOrganisationId}/upload-attachment/`,
      formdata,
      { method: "POST", headers: { "Content-Type": "multipart/form-data" } }
    )

    if ("shouldAuthenticate" in response)
      throw new Error("Session expired, log in again")

    return successResponse("", "", response)
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
}

type TakeoverResponse = { success: true }
export const takeoverTicket = async (state: FormState, formdata: FormData) => {
  const { successResponse, errorResponse } =
    formStateResponse<TakeoverResponse>(state)
  const { ticket } = Object.fromEntries(formdata)

  try {
    const session = await getSession()
    const response = await sendAuthRequest<TakeoverResponse>(
      `/api/v1/helpdesk/tickets/${ticket}/take-over/`,
      { organisation_id: session?.currentOrganisationId },
      { method: "POST" }
    )

    if ("shouldAuthenticate" in response)
      throw new Error("Session expired, log in again")

    return successResponse("", "", response)
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
}

export const changeTicketStatus = async (
  status: TicketStatus,
  ticket: string
) => {
  const { successResponse, errorResponse } = formStateResponse<Ticket>()

  try {
    const session = await getSession()
    const response = await sendAuthRequest<Ticket>(
      `/api/v1/helpdesk/tickets/${ticket}/edit/`,
      { organisation_id: session?.currentOrganisationId, status },
      { method: "PATCH" }
    )

    if ("shouldAuthenticate" in response)
      throw new Error("Session expired, log in again")

    return successResponse("", "", response)
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
}
export type SendCopilotMessageResponse = {
  ticket_copilot_message_id: string
  ticket_copilot_sate_response_id: string
  response: string
  message: string
}
export const sendCopilotMessage = async (
  state: FormState,
  formdata: FormData
) => {
  const { successResponse, errorResponse } =
    formStateResponse<SendCopilotMessageResponse>(state)
  const { message, ticketId } = Object.fromEntries(formdata)

  try {
    const session = await getSession()
    const response = await sendAuthRequest<SendCopilotMessageResponse>(
      `/api/v1/helpdesk/copilot/`,
      {
        organisation_id: session?.currentOrganisationId,
        message,
        ticket_id: ticketId,
      },
      { method: "POST" }
    )

    if ("shouldAuthenticate" in response)
      throw new Error("Session expired, log in again")

    return successResponse("", "", response)
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
}
