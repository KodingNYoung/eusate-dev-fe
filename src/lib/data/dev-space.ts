"use server"

import { ERROR_CAUSES } from "@/utils/constants"
import { getSession } from "../sessions"
import { sendAuthRequest } from "../request"
import { AuthConfig, DBResource, DSFunction } from "@/utils/types"

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

export type DevSpaceFunctionsResponse = DBResource &
  Omit<DSFunction, "auth_config_id"> & {
    auth_config?: string
  }

export const getDevSpaceFunctions = async () => {
  const session = await getSession()
  const response = await sendAuthRequest<DevSpaceFunctionsResponse[]>(
    `/api/v1/lab/${session?.organisationId}/functions/`
  )

  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }

  return response
}

type CodeNameResponse = { code_names: string[] }
export const getParamsCodenames = async () => {
  const response = await sendAuthRequest<CodeNameResponse>(
    "/api/v1/lab/code-names/"
  )

  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }

  return response
}
