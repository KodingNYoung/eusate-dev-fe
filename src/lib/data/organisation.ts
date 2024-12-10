"use server"

import { ERROR_CAUSES } from "@/utils/constants"
import { sendAuthRequest } from "../request"

type GetOrganizationResponse = {
  id: string
  owner: string
  date_created: string
  date_updates: string
  name: string
  meta: { [k: string]: string | number | boolean }
}

export const getOrganisation = async (id: string) => {
  try {
    const response = await sendAuthRequest<GetOrganizationResponse>(
      `/api/v1/organisations/${id}/`
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

export const editOrganisation = async (
  id: string,
  payload: Partial<Pick<GetOrganizationResponse, "meta">>
) => {
  try {
    const response = await sendAuthRequest<GetOrganizationResponse>(
      `/api/v1/organisations/${id}/edit/`,
      payload,
      { method: "PATCH" }
    )


    if ("shouldAuthenticate" in response) {
      throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
    }

    return { success: { message: "" }, data: response }
  } catch (err) {
    return {
      error: {
        message: err instanceof Error ? err.message : "Something went wrong",
      },
      shouldAuthenticate:
        err instanceof Error && err.cause === ERROR_CAUSES.SESSION_EXPIRED,
    }
  }
}
