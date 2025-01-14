"use server"

import { sendAuthRequest } from "@/lib/request"
import { getSession } from "@/lib/sessions"
import { ROUTES } from "@/utils/constants"
import { formStateResponse } from "@/utils/helpers"
import { FormState } from "@/utils/types"
import { revalidatePath } from "next/cache"

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
type CreateArticleByLinkResponse = { process_id: string }

// create article and revalidate the knowledge base url
export const createArticleByLink = async (
  state: FormState,
  formdata: FormData
): Promise<FormState> => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const { url } = Object.fromEntries(formdata)
  const message = "Article record creation in progress"
  const session = await getSession()

  try {
    const response = await sendAuthRequest<CreateArticleByLinkResponse>(
      "/api/v1/library/article/add-link/",
      { url, organisation_id: session?.organisationId },
      { method: "POST" }
    )

    // handle auth check
    if ("shouldAuthenticate" in response) {
      throw new Error("Session expired, log in again")
    }
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
  revalidatePath(ROUTES.KNOWLEDGE_BASE)
  return successResponse(message)
}
