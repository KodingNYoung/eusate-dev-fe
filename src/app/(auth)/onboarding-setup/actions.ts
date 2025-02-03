"use server"

import { ROUTES } from "@/utils/constants"
import { formStateResponse } from "@/utils/helpers"
import { FormState } from "@/utils/types"
import { getSession } from "@/lib/sessions"
import { sendAuthRequest } from "@/lib/request"

type OrganizationOnboarding = {
  id: string
  name: string
  owner: string
  meta: { [key: string]: string | number }
  date_created: string
  date_updated: string
}

export const setupAccount = async (
  state: FormState,
  formdata: FormData
): Promise<FormState> => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const payload = Object.fromEntries(formdata)
  let route

  try {
    const session = await getSession()
    // connect to api endpoint
    const response = await sendAuthRequest<OrganizationOnboarding>(
      `/api/v1/organisations/${session?.organisationId}/edit/`,
      {
        meta: {
          company_size: payload.company_size as string,
          sector: payload.sector as string,
          use_case: payload.use_case as string,
        },
      },
      { method: "PATCH" }
    )

    if ("shouldAuthenticate" in response) {
      route = ROUTES.LOGIN
      throw new Error("Session expired, log in again")
    } else {
      route = ROUTES.OVERVIEW
    }

    return successResponse("Company info saved.", route)
  } catch (err) {
    return errorResponse(
      {
        type: "request",
        message: err instanceof Error ? err.message : "Something went wrong",
      },
      route
    )
  }
}
