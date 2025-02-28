"use server"

import { ERROR_CAUSES } from "@/utils/constants"
import { getSession } from "../sessions"
import { sendAuthRequest } from "../request"
import { AuthConfig, DBResource } from "@/utils/types"

export type AuthConfigurationResponse = DBResource & AuthConfig

export const getAuthConfiguration = async () => {
  const session = await getSession()
  const response = await sendAuthRequest<AuthConfigurationResponse[]>(
    `/api/v1/lab/${session?.organisationId}/auth-configs/`
  )

  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }

  return response
}
getAuthConfiguration.queryKey = [] as string[]
