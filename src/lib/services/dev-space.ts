"server only"
import { AuthConfig } from "@/utils/types"
import { getSession } from "../sessions"
import { sendAuthRequest } from "../request"
import { AuthConfigurationResponse } from "../data/dev-space"
import { ERROR_CAUSES } from "@/utils/constants"

export const createAuthConfig = async (payload: AuthConfig) => {
  const session = await getSession()

  const response = await sendAuthRequest<AuthConfigurationResponse>(
    "/api/v1/lab/auth-config/add/",
    { ...payload, organisation_id: session?.organisationId },
    { method: "POST" }
  )

  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }
  return response
}
export const editAuthConfig = async (id: string, payload: AuthConfig) => {
  const session = await getSession()

  const response = await sendAuthRequest<AuthConfigurationResponse>(
    `/api/v1/lab/auth-config/${id}/edit/`,
    { ...payload, organisation_id: session?.organisationId },
    { method: "PUT" }
  )

  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }
  return response
}

export const deleteAuthconfig = async (id: string) => {
  const session = await getSession()
  const response = sendAuthRequest(
    `/api/v1/lab/auth-config/${id}/delete/`,
    { organisation_id: session?.organisationId },
    { method: "DELETE" }
  )

  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }
  return response
}
