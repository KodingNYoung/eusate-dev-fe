"use server"

import { sendAuthRequest, sendRequest } from "@/lib/request"
import { getSession } from "@/lib/sessions"
import { ROUTES } from "@/utils/constants"
import { formStateResponse } from "@/utils/helpers"
import { FormState, MemberInviteType } from "@/utils/types"

export const sendInvite = async (
  state: FormState,
  formdata: FormData
): Promise<FormState> => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const email = formdata.get("email")
  const permissions = formdata.getAll("permissions")

  try {
    const session = await getSession()
    const response = await sendAuthRequest<MemberInviteType>(
      `/api/v1/organisations/${session?.currentOrganisationId}/invite/`,
      { email, permissions },
      { method: "POST" }
    )

    if ("shouldAuthenticate" in response)
      throw new Error("Session expired, log in again")

    return successResponse("", "", response)
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
}
export const updateMemberPermissions = async (
  state: FormState,
  formdata: FormData
): Promise<FormState> => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const id = formdata.get("id")
  const permissions = formdata.getAll("permissions")

  try {
    const session = await getSession()
    const response = await sendAuthRequest<{ success: true }>(
      `/api/v1/organisations/${session?.currentOrganisationId}/users/${id}/permissions/`,
      { permissions },
      { method: "PUT" }
    )

    if ("shouldAuthenticate" in response)
      throw new Error("Session expired, log in again")

    return successResponse("Updated user's access!", "", response)
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
}
export const removeMember = async (
  state: FormState,
  formdata: FormData
): Promise<FormState> => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const id = formdata.get("id")

  try {
    const session = await getSession()
    const response = await sendAuthRequest<{ success: true }>(
      `/api/v1/organisations/${session?.currentOrganisationId}/users/${id}/remove/`,
      { method: "DELETE" }
    )

    if ("shouldAuthenticate" in response)
      throw new Error("Session expired, log in again")

    return successResponse("Updated user's access!", "", response)
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
}
export const rejectInvite = async (
  state: FormState,
  formdata: FormData
): Promise<FormState> => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const { invite_id, organisation_id } = Object.fromEntries(formdata)

  try {
    const response = await sendRequest<MemberInviteType>(
      `/api/v1/organisations/${organisation_id}/invite/reject/`,
      { invite_id },
      { method: "POST" }
    )

    if ("shouldAuthenticate" in response)
      throw new Error("Session expired, log in again")

    return successResponse("", "", response)
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
}
export const acceptInvite = async (
  state: FormState,
  formdata: FormData
): Promise<FormState> => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const { invite_id, organisation_id } = Object.fromEntries(formdata)

  try {
    const response = await sendRequest<MemberInviteType>(
      `/api/v1/organisations/${organisation_id}/invite/accept/`,
      { invite_id },
      { method: "POST" }
    )

    if ("shouldAuthenticate" in response)
      throw new Error("Session expired, log in again")

    return successResponse("", ROUTES.LOGIN, response)
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
}
