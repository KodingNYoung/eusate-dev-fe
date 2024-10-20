import { ROUTES } from "@/utils/constants"
import { extractZodErrors, formStateResponse } from "@/utils/helpers"
import { FormState } from "@/utils/types"
import {
  sendCodePayloadSchema,
  setup2faPayloadSchema,
} from "@/validations/auth"

export const setup2fa = async (state: FormState, formdata: FormData) => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const payload = Object.fromEntries(formdata)
  const route =
    payload.method === "email"
      ? `${ROUTES.EMAIL_2FA}?email=${payload.email}`
      : ROUTES.AUTHENTICATON_2FA

  // validate
  const result = setup2faPayloadSchema.safeParse(payload)
  if (!result.success) {
    return errorResponse({
      type: "validation",
      fields: extractZodErrors(result.error),
    })
  }

  // return response
  return new Promise((res) =>
    setTimeout(() => res(successResponse("Success", route)), 2000)
  ) as Promise<FormState>
}

export const sendCode = async (state: FormState, formdata: FormData) => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const payload = Object.fromEntries(formdata)
  const route = ROUTES.TWOFA_COMPLETED

  // validate
  const result = sendCodePayloadSchema.safeParse(payload)
  if (!result.success) {
    return errorResponse({
      type: "validation",
      fields: extractZodErrors(result.error),
    })
  }

  // return response
  return new Promise((res) =>
    setTimeout(() => res(successResponse("Success", route)), 2000)
  ) as Promise<FormState>
}
