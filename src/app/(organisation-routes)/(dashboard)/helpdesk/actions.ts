"use server"

import { sendAuthRequest } from "@/lib/request"
import { getSession } from "@/lib/sessions"
import { formStateResponse } from "@/utils/helpers"
import { AttachmentMetadata, FormState, TicketComment } from "@/utils/types"

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
    console.log(response)

    return successResponse("", "", response)
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
}
