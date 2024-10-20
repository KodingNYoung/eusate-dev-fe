import { ROUTES } from "@/utils/constants"
import { extractZodErrors, formStateResponse } from "@/utils/helpers"
import { FormState } from "@/utils/types"
import { signupPayloadSchema } from "@/validations/auth"

export const signup = async (
  state: FormState,
  formdata: FormData
): Promise<FormState> => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const payload = Object.fromEntries(formdata)

  //   validate
  const result = signupPayloadSchema.safeParse(payload)
  if (!result.success) {
    return errorResponse({
      type: "validation",
      fields: extractZodErrors(result.error),
    })
  }
  // connect to api endpoint
  try {
  } catch (err) {
    console.log(err)
  }

  //   return responses
  return new Promise((res) =>
    setTimeout(
      () =>
        res(
          successResponse(
            "Success",
            `${ROUTES.SETUP_2FA}?email=${payload.email}`
          )
        ),
      2000
    )
  ) as Promise<FormState>
}
