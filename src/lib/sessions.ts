"server only"
import { SessionPayload } from "@/utils/types"
import { API_BASEURL, COOKIES_KEYS } from "@/utils/constants"
import { cookies } from "next/headers"
import { jwtVerify, SignJWT } from "jose"
import axios from "axios"

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodedKey)
}

async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    })
    return payload
  } catch {
    console.log("Failed to verify session")
  }
}

export async function createSession(payload: SessionPayload) {
  const expiresAt = new Date(Date.now() + 1 * 1 * 60 * 60 * 1000) //1 hr
  const session = await encrypt({ ...payload, expiresAt })

  cookies().set(COOKIES_KEYS.SESSION, session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  })
}

export const getSession = async (): Promise<SessionPayload | null> => {
  const session = cookies().get(COOKIES_KEYS.SESSION)?.value

  if (!session) return null

  const payload = await decrypt(session)

  if (!payload) return null

  return payload as SessionPayload
}

export async function updateSession(payload: Partial<SessionPayload>) {
  const session = await getSession()

  if (!session) return null

  const newSession = await encrypt({ ...session, ...payload })

  cookies().set(COOKIES_KEYS.SESSION, newSession, {
    httpOnly: true,
    secure: true,
    expires: new Date(session.expiresAt || ""),
    sameSite: "lax",
    path: "/",
  })
}

export async function deleteSession() {
  cookies().delete(COOKIES_KEYS.SESSION)
}

export const verifySession = async () => {
  const session = await getSession()

  if (!session?.accessToken) {
    return null
  }
  return { isAuth: true, accessToken: session.accessToken }
}

// Add these new functions:
export async function refreshAccessToken(): Promise<{
  success: boolean
  accessToken?: string
}> {
  const session = await getSession()

  if (!session?.refreshToken) {
    return { success: false }
  }

  try {
    const response = await axios.post(
      `${API_BASEURL}/api/v1/auth/token/refresh/`,
      { refresh: session.refreshToken },
      { method: "POST" }
    )

    const accessToken = response.data.access as string

    // Update session with new access token
    await updateSession({ accessToken })

    return { success: true, accessToken }
  } catch {
    await deleteSession()
    return { success: false }
  }
}
