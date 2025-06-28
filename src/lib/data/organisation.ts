"use server"

import { ERROR_CAUSES } from "@/utils/constants"
import { sendAuthRequest } from "../request"
import { getSession } from "../sessions"
import { DBResource, OrganisationType, UserPermission } from "@/utils/types"
import { cache } from "react"

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
