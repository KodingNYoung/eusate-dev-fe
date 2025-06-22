"use server"

import { ROUTES } from "@/utils/constants"
import { formStateResponse } from "@/utils/helpers"
import { FormState } from "@/utils/types"
import { sendRequest } from "@/lib/request"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { createSession } from "@/lib/sessions"

type SignupResponse = {
  username: string
  email: string
  organisation_name: string
  user_meta: { role: string }
  user_id: string
  organisation_id: string
}

export const signup = async (
  state: FormState,
  formdata: FormData
): Promise<FormState> => {
  const { errorResponse } = formStateResponse(state)
  const { username, email, organisation_name, role } =
    Object.fromEntries(formdata)
  const route = `${ROUTES.TWOFA_SETUP}`

  try {
    // connect to api endpoint
    const res = await sendRequest<SignupResponse>(
      "/api/v1/auth/register/",
      {
        username,
        email,
        organisation_name,
        user_meta: { role },
      },
      { method: "POST" }
    )

    // create session
    await createSession({
      email: res.email,
      ownedOrganisationId: res.organisation_id,
      userId: res.user_id,
    })
  } catch (err) {
    return errorResponse({
      type: "request",
      message: err instanceof Error ? err.message : "Something went wrong",
    })
  }

  revalidatePath(ROUTES.SIGN_UP)
  redirect(route)
}
