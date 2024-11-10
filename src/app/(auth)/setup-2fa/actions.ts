"use server"

import { ROUTES } from "@/utils/constants"
import { formStateResponse } from "@/utils/helpers"
import { FormState } from "@/utils/types"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { sendRequest } from "@/lib/request"
import { getSession } from "@/lib/sessions"
import { TwoFAMethods } from "@/utils/enums"

type InitializeTwoFAProps = {
  secret_key: string
  bar_code_url: string
  bar_code_svg: string
}

export const setup2fa = async (state: FormState, formdata: FormData) => {
  const { method } = Object.fromEntries(formdata)
  const route = `${ROUTES.TWOFA_METHOD}?method=${method}`

  revalidatePath(ROUTES.TWOFA_SETUP)
  redirect(route)
}

export const initiateTwoFA = async (method: TwoFAMethods) => {
  const { successResponse, errorResponse } =
    formStateResponse<InitializeTwoFAProps>()
  try {
    const session = await getSession()
    const res = await sendRequest<InitializeTwoFAProps>(
      "/api/v1/auth/twofa/init/",
      { user_id: session?.userId, twofa_method: method },
      { method: "POST" }
    )

    return successResponse("", "", res)
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
}

export const sendCode = async (state: FormState, formdata: FormData) => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const { code } = Object.fromEntries(formdata)
  const route = ROUTES.TWOFA_COMPLETED

  try {
    const session = await getSession()
    await sendRequest(
      "/api/v1/auth/twofa/complete/",
      { user_id: session?.userId, code },
      { method: "POST" }
    )
    return successResponse("2FA code verified successfully!", route)
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
}
