"use server"

import { ERROR_CAUSES } from "@/utils/constants"
import { sendAuthRequest } from "../request"
import { getSession } from "../sessions"

type GetOrganizationResponse = {
  id: string
  owner: string
  date_created: string
  date_updates: string
  name: string
  meta: { [k: string]: string | number | boolean }
}

export const getOrganisation = async () => {
  try {
    const session = await getSession()
    const response = await sendAuthRequest<GetOrganizationResponse>(
      `/api/v1/organisations/${session?.organisationId}/`
    )
    if ("shouldAuthenticate" in response) {
      throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
    }

    return { success: { message: "" }, data: response }
  } catch (err) {
    return {
      error: { message: err instanceof Error && err.message },
      shouldAuthenticate:
        err instanceof Error && err.cause === ERROR_CAUSES.SESSION_EXPIRED,
    }
  }
}
