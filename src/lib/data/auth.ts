"server only"

import { SessionPayload } from "@/utils/types"
import { sendRequest } from "../request"
import { createSession, getSession } from "../sessions"

type RefreshAccessTokenResponse = {
  access: string
}

export const refreshAccessToken = async () => {
  try {
    const session = await getSession()
    const res = await sendRequest<RefreshAccessTokenResponse>(
      "/api/v1/auth/token/refresh/",
      { refresh: session?.refreshToken },
      { method: "POST" }
    )
    await createSession({
      ...session,
      accessToken: res.access,
    } as SessionPayload)

    return { success: true }
  } catch (err) {
    console.log("couldn't refresh access token", err)
    return { success: false }
  }
}
