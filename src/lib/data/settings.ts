"use server"

import { ApiKeysType, DBResource } from "@/utils/types"
import { sendAuthRequest } from "../request"
import { getSession } from "../sessions"
import { ERROR_CAUSES } from "@/utils/constants"

export type ApiKeyResponse = DBResource & ApiKeysType
export const getAPiKeys = async () => {
  const session = await getSession()
  const response = await sendAuthRequest<ApiKeyResponse[]>(
    `/api/v1/organisations/${session?.organisationId}/apikeys/`
  )
  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }

  return response
}
