"use server"

import { sendAuthRequest } from "@/lib/request"
import { updateSession } from "@/lib/sessions"
import { formStateResponse } from "@/utils/helpers"
import { FormState, OrganisationContext } from "@/utils/types"

export const updateCurrentOrganisationInSession = async (
  currentOrganisationId: string
) => {
  await updateSession({ currentOrganisationId })
}

export const updateCurrentOrganisation = async (
  organisation_id: string
): Promise<FormState<OrganisationContext>> => {
  const { successResponse, errorResponse } = formStateResponse()

  try {
    const response = await sendAuthRequest<OrganisationContext>(
      `/api/v1/organisations/context/`,
      { organisation_id },
      { method: "PUT" }
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
