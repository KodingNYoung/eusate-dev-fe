"server only"
import { AuthConfig, DSFunction } from "@/utils/types"
import { getSession } from "../sessions"
import { sendAuthRequest } from "../request"
import {
  AuthConfigurationResponse,
  DevSpaceFunctionsResponse,
} from "../data/dev-space"
import { ERROR_CAUSES } from "@/utils/constants"

export const createAuthConfig = async (payload: AuthConfig) => {
  const session = await getSession()

  const response = await sendAuthRequest<AuthConfigurationResponse>(
    "/api/v1/lab/auth-config/add/",
    { ...payload, organisation_id: session?.currentOrganisationId },
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
    { ...payload, organisation_id: session?.currentOrganisationId },
    { method: "PUT" }
  )

  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }
  return response
}
export const createFunction = async (payload: DSFunction) => {
  const session = await getSession()

  const response = await sendAuthRequest<DevSpaceFunctionsResponse>(
    "/api/v1/lab/function/add/",
    { ...payload, organisation_id: session?.currentOrganisationId },
    { method: "POST" }
  )

  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }
  return response
}
export const editFunction = async (id: string, payload: DSFunction) => {
  const session = await getSession()

  const response = await sendAuthRequest<DevSpaceFunctionsResponse>(
    `/api/v1/lab/function/${id}/edit/`,
    { ...payload, organisation_id: session?.currentOrganisationId },
    { method: "PATCH" }
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
    { organisation_id: session?.currentOrganisationId },
    { method: "DELETE" }
  )

  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }
  return response
}
export const deleteFunction = async (id: string) => {
  const session = await getSession()
  const response = sendAuthRequest(
    `/api/v1/lab/function/${id}/delete/`,
    { organisation_id: session?.currentOrganisationId },
    { method: "DELETE" }
  )

  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }
  return response
}
