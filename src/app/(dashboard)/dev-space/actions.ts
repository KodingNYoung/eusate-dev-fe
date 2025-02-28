"use server"

import { AuthConfigurationResponse } from "@/lib/data/dev-space"
import {
  createAuthConfig,
  deleteAuthconfig,
  editAuthConfig,
} from "@/lib/services/dev-space"
import { ROUTES } from "@/utils/constants"
import { formStateResponse } from "@/utils/helpers"
import { AuthConfig, FormState } from "@/utils/types"
import { revalidatePath } from "next/cache"

export const addAuthConfig = async (
  state: FormState,
  formdata: FormData
): Promise<FormState> => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const {
    login_url,
    auth_location,
    auth_type,
    query_name,
    header_name,
    header_value,
  } = Object.fromEntries(formdata) as AuthConfig
  try {
    await createAuthConfig({
      login_url,
      auth_location,
      auth_type,
      query_name,
      header_name,
      header_value,
    })
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
  revalidatePath(ROUTES.DEV_SPACE)
  return successResponse("")
}

export const updateAuthConfig = async (
  state: FormState,
  formdata: FormData
): Promise<FormState> => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const {
    id,
    login_url,
    auth_location,
    auth_type,
    query_name,
    header_name,
    header_value,
  } = Object.fromEntries(formdata) as AuthConfigurationResponse
  try {
    await editAuthConfig(id, {
      login_url,
      auth_location,
      auth_type,
      query_name,
      header_name,
      header_value,
    })
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
  revalidatePath(ROUTES.DEV_SPACE)
  return successResponse("")
}

export const removeAuthConfig = async (
  state: FormState,
  formdata: FormData
) => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const message = "You have successfully deleted a source."
  const { id } = Object.fromEntries(formdata)
  try {
    await deleteAuthconfig(id as string)
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }

  revalidatePath(ROUTES.DEV_SPACE)
  return successResponse(message)
}
