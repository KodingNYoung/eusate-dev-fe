"use server"

import { sendAuthRequest } from "@/lib/request"
import { getSession } from "@/lib/sessions"
import { formStateResponse } from "@/utils/helpers"
import { FormState } from "@/utils/types"

export type ValidateUrlResponse = { valid: boolean }

export const validateUrl = async (
  state: FormState<ValidateUrlResponse>,
  formdata: FormData
) => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const { url } = Object.fromEntries(formdata)

  try {
    const session = await getSession()
    const response = await sendAuthRequest<ValidateUrlResponse>(
      "/api/v1/library/validate-url/",
      {
        organisation_id: session?.organisationId,
        url,
      },
      { method: "POST" }
    )
    // handle auth check
    if ("shouldAuthenticate" in response) {
      throw new Error("Session expired, log in again")
    }

    return successResponse("", "", response)
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
}
