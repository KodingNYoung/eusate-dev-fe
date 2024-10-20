import { ROUTES } from "@/utils/constants"
import { extractZodErrors, formStateResponse } from "@/utils/helpers"
import { FormState } from "@/utils/types"
import { onboardingSetupPayloadSchema } from "@/validations/auth"

export const setupAccount = async (state: FormState, formdata: FormData) => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const payload = Object.fromEntries(formdata)
  const route = ROUTES.OVERVIEW

  // validate
  const result = onboardingSetupPayloadSchema.safeParse(payload)
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
