"use server"
import { ROUTES } from "@/utils/constants"
import { TwoFAMethods } from "@/utils/enums"
import { extractZodErrors, formStateResponse } from "@/utils/helpers"
import { FormState } from "@/utils/types"
import {
  initiateLoginPayloadSchema,
  sendCodePayloadSchema,
} from "@/validations/auth"

export const initiateLogin = async (
  state: FormState,
  formdata: FormData
): Promise<FormState> => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const payload = Object.fromEntries(formdata)
  let route = ROUTES.LOGIN_2FA

  //   validate
  const result = initiateLoginPayloadSchema.safeParse(payload)
  if (!result.success) {
    return errorResponse({
      type: "validation",
      fields: extractZodErrors(result.error),
    })
  }
  // connect to api endpoint
  try {
    route += `?method=${TwoFAMethods.AUTHENTICATOR}`
  } catch (err) {
    console.log(err)
  }

  //   return responses
  return new Promise((res) =>
    setTimeout(() => res(successResponse("Success", route)), 2000)
  ) as Promise<FormState>
}
export const finalizeLogin = async (
  state: FormState,
  formdata: FormData
): Promise<FormState> => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const payload = Object.fromEntries(formdata)
  let route = ROUTES.OVERVIEW

  //   validate
  const result = sendCodePayloadSchema.safeParse(payload)
  if (!result.success) {
    return errorResponse({
      type: "validation",
      fields: extractZodErrors(result.error),
    })
  }
  // connect to api endpoint
  try {
    route += `?method=${TwoFAMethods.AUTHENTICATOR}`
  } catch (err) {
    console.log(err)
  }

  //   return responses
  return new Promise((res) =>
    setTimeout(() => res(successResponse("Success", route)), 2000)
  ) as Promise<FormState>
}
