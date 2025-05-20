"use server"

import { sendAuthRequest } from "@/lib/request"
import { getSession } from "@/lib/sessions"
import { formStateResponse } from "@/utils/helpers"
import { FormState, TicketComment } from "@/utils/types"

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
      { message, ticket_id, organisation_id: session?.organisationId },
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
