"use server"

import { sendAuthRequest } from "@/lib/request"
import { updateSession } from "@/lib/sessions"
import { formStateResponse } from "@/utils/helpers"
import { revalidatePath } from "next/cache"

export const updateCurrentOrganisationInSession = async (
  currentOrganisationId: string
) => {
  await updateSession({ currentOrganisationId })
}

export const updateCurrentOrganisation = async (organisation_id: string) => {
  const { successResponse, errorResponse } = formStateResponse()

  try {
    const response = await sendAuthRequest<{ success: true }>(
      `/api/v1/organisations/context/`,
      { organisation_id },
      { method: "PUT" }
    )
    if ("shouldAuthenticate" in response)
      throw new Error("Session expired, log in again")
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
  revalidatePath("/")
  return successResponse("")
}
