"use server"

import { sendAuthRequest } from "@/lib/request"
import { getSession } from "@/lib/sessions"
import { ERROR_CAUSES, ROUTES } from "@/utils/constants"
import { formStateResponse } from "@/utils/helpers"
import { FormState } from "@/utils/types"
import { revalidatePath } from "next/cache"

export const generateAPIKey = async (state: FormState, formdata: FormData) => {
  const { successResponse, errorResponse } = formStateResponse<{
    token: string
  }>(state)
  const { name, expiry_num, expiry_unit } = Object.fromEntries(formdata)

  try {
    const session = await getSession()
    const response = await sendAuthRequest<{ token: string }>(
      `/api/v1/organisations/${session?.organisationId}/apikeys/add/`,
      expiry_num ? { name, expiry_num, expiry_unit } : { name },
      { method: "POST" }
    )

    if ("shouldAuthenticate" in response) {
      throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
    }

    return successResponse("", "", response)
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
}

export const deleteAPIKey = async (state: FormState, formdata: FormData) => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const { token } = Object.fromEntries(formdata)

  try {
    const session = await getSession()
    const response = await sendAuthRequest<{ success: true }>(
      `/api/v1/organisations/${session?.organisationId}/apikeys/delete/`,
      { token },
      { method: "DELETE" }
    )
    if ("shouldAuthenticate" in response)
      throw new Error("Session expired, log in again")
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
  revalidatePath(ROUTES.SETTINGS)
  return successResponse("")
}

export const revokeAPIKey = async (state: FormState, formdata: FormData) => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const { token } = Object.fromEntries(formdata)

  try {
    const session = await getSession()
    const response = await sendAuthRequest<{ success: true }>(
      `/api/v1/organisations/${session?.organisationId}/apikeys/revoke/`,
      { token },
      { method: "POST" }
    )
    if ("shouldAuthenticate" in response)
      throw new Error("Session expired, log in again")
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
  revalidatePath(ROUTES.SETTINGS)
  return successResponse("")
}
