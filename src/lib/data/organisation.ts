"use server"

import { ERROR_CAUSES } from "@/utils/constants"
import { sendAuthRequest } from "../request"
import { getSession } from "../sessions"
import {
  DBResource,
  MemberInviteType,
  OrganisationType,
  OrganisationUser,
  UserPermission,
} from "@/utils/types"
import { cache } from "react"
import { objToQuery } from "@/utils/helpers"

export const getOwnedOrganisation = cache(async () => {
  const session = await getSession()
  const response = await sendAuthRequest<OrganisationType>(
    `/api/v1/organisations/${session?.ownedOrganisationId}/`
  )
  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }

  return response
})

/**
 * Get user's last selected organisation with full details
 */
type OrganisationContext = DBResource & {
  user: string
  organisation: OrganisationType
}
export const getCurrentOrganisation = cache(async () => {
  const response = await sendAuthRequest<OrganisationContext>(
    `/api/v1/organisations/context/`
  )
  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }

  return response
})

/**
 * Get user's permission in the current organisation
 */
export const getOrganisationUserPermissions = cache(async () => {
  const session = await getSession()
  const response = await sendAuthRequest<UserPermission[]>(
    `/api/v1/organisations/${session?.currentOrganisationId}/permissions/me/`
  )
  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }

  return response
})

/**
 * Get user's permission in the current organisation
 */
export const getUserPermissionsById = cache(async (id?: string) => {
  const session = await getSession()
  const response = await sendAuthRequest<UserPermission[]>(
    `/api/v1/organisations/${session?.currentOrganisationId}/users/${id}/permissions/`
  )
  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }

  return response
})

/**
 * Get user's permission in the current organisation
 */
type GetOrganisationUserResponse = {
  count: 3
  next: null
  previous: null
  results: OrganisationUser[]
}
export type GetOrganisationUserOptions = { sort_by?: string; search?: string }
export const getOrganisationUsers = cache(
  async (options: GetOrganisationUserOptions = {}) => {
    const query = objToQuery(options)
    const session = await getSession()
    const response = await sendAuthRequest<GetOrganisationUserResponse>(
      `/api/v1/organisations/${session?.currentOrganisationId}/users/?${query}`
    )
    if ("shouldAuthenticate" in response) {
      throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
    }

    return response
  }
)

/**
 * Get all permissions
 */
export const getAllPermissions = cache(async () => {
  const response =
    await sendAuthRequest<UserPermission[]>(`/api/v1/permissions/`)
  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }

  return response
})

export const getInvite = cache(
  async (inviteId: string, organisationId: string) => {
    const response = await sendAuthRequest<MemberInviteType>(
      `/api/v1/organisations/${organisationId}/invite/${inviteId}/`
    )
    if ("shouldAuthenticate" in response) {
      throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
    }

    return response
  }
)
