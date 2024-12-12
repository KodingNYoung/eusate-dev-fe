"use server"

import { sendAuthRequest } from "@/lib/request"
import { getSession } from "@/lib/sessions"
import { formStateResponse } from "@/utils/helpers"
import { FormState } from "@/utils/types"

type AddFAQResponse = { success: true }

export const addFAQ = async (
  state: FormState,
  formdata: FormData
): Promise<FormState> => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const { question, answer } = Object.fromEntries(formdata)

  try {
    const session = await getSession()
    const response = await sendAuthRequest<AddFAQResponse>(
      "/api/v1/library/faq/add/",
      {
        organisation_id: session?.organisationId,
        question,
        answer,
      },
      { method: "POST" }
    )

    // handle auth check
    if ("shouldAuthenticate" in response) {
      throw new Error("Session expired, log in again")
    }
    console.log(response)
    return successResponse("")
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
}
