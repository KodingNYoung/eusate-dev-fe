"use server"
import { ROUTES } from "@/utils/constants"
import { TwoFAMethods } from "@/utils/enums"
import { formStateResponse } from "@/utils/helpers"
import { FormState } from "@/utils/types"
import { sendAuthRequest, sendRequest } from "@/lib/request"
import { redirect } from "next/navigation"
import { createSession, getSession, updateSession } from "@/lib/sessions"

type InitiateLoginResponse = {
  access: string
  refresh: string
  twofa_method?: TwoFAMethods | null
  verified: boolean
  user_id: string
  organisation_id: string
  onboarded: boolean | null
}

export const initiateLogin = async (
  state: FormState,
  formdata: FormData
): Promise<FormState> => {
  const { errorResponse } = formStateResponse(state)
  const { email } = Object.fromEntries(formdata)
  let route = ROUTES.LOGIN_2FA

  // connect to api endpoint
  try {
    const response = await sendRequest<InitiateLoginResponse>(
      "/api/v1/auth/login/",
      { email },
      { method: "POST" }
    )

    // save session to cookie storage
    await createSession({
      refreshToken: response.refresh,
      // accessToken: response.access,
      email: email as string,
      isVerified: response.verified,
      twofaMethod: response.twofa_method,
      userId: response.user_id,
      organisationId: response.organisation_id,
      shouldOnboard: response.onboarded === false,
    })

    // handle route redirect
    if (response.verified) {
      route = `${ROUTES.LOGIN_2FA}?method=${response.twofa_method}`
    } else {
      route = `${ROUTES.TWOFA_SETUP}`
    }
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }

  redirect(route)
}

type FinalizeLoginResponse = { success: boolean }

// Finalizes login and redirect to onboarding page
export const finalizeLogin = async (
  state: FormState,
  formdata: FormData
): Promise<FormState> => {
  const { successResponse, errorResponse } = formStateResponse(state)
  const { code } = Object.fromEntries(formdata)
  let route,
    message = "Login successful"

  try {
    const session = await getSession()
    const response = await sendAuthRequest<FinalizeLoginResponse>(
      "/api/v1/auth/twofa/verify/",
      { code },
      { method: "POST" }
    )

    // handle auth check
    if ("shouldAuthenticate" in response) {
      route = ROUTES.LOGIN
      throw new Error("Session expired, log in again")
    }

    // update session
    await updateSession({ tokenVerified: true })

    // handle route redirect
    if (session?.shouldOnboard) {
      message =
        "Login successful, you will be redirected to complete your onboarding."
      route = ROUTES.ONOBOARDING_SETUP
    } else {
      route = ROUTES.OVERVIEW
    }

    return successResponse(message, route)
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
