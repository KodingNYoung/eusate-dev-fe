"use server"

import { ERROR_CAUSES } from "@/utils/constants"
import { sendAuthRequest } from "../request"
import { getSession } from "../sessions"
import { OrganisationType } from "@/utils/types"

export const getOwnedOrganisation = async () => {
  const session = await getSession()
  const response = await sendAuthRequest<OrganisationType>(
    `/api/v1/organisations/${session?.ownedOrganisationId}/`
  )
  if ("shouldAuthenticate" in response) {
    throw new Error("", { cause: ERROR_CAUSES.SESSION_EXPIRED })
  }

  return response
}
