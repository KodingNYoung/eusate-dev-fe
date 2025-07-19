"use server"

import { sendAuthRequest } from "@/lib/request"
import { deleteSession, getSession, refreshAccessToken } from "@/lib/sessions"
import { ROUTES } from "@/utils/constants"
import { formStateResponse } from "@/utils/helpers"
import { FormState } from "@/utils/types"
import { redirect } from "next/navigation"

export const refreshTokenAction = async () => {
  return await refreshAccessToken()
}

export async function logoutAction() {
  deleteSession()
  redirect(ROUTES.LOGIN)
}

export async function getAccessTokenAction() {
  const session = await getSession()
  return session?.accessToken || null
}

type FinalizeLoginResponse = { success: boolean }

// Finalizes login and redirect to onboarding page
export const resendOtp = async (): Promise<FormState> => {
  const { successResponse, errorResponse } = formStateResponse()

  try {
    const session = await getSession()
    const response = await sendAuthRequest<FinalizeLoginResponse>(
      "/api/v1/auth/twofa/resend/",
      { user_id: session?.userId },
      { method: "POST" }
    )

    // handle auth check
    if ("shouldAuthenticate" in response) {
      throw new Error("Session expired, log in again")
    }

    return successResponse("We've sent you a new code to your email.")
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }
}
