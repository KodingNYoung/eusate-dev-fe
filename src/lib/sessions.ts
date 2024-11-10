"server only"
import { SessionPayload } from "@/utils/types"
import { COOKIES_KEYS } from "@/utils/constants"
import { cookies } from "next/headers"
import { jwtVerify, SignJWT } from "jose"

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
  } catch (error) {
    console.log("Failed to verify session", error)
  }
}

export async function createSession(payload: SessionPayload) {
  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) //1 hr
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
  const payload = await decrypt(session)

  if (!session || !payload) {
    return null
  }
  return payload as SessionPayload
}

export async function updateSession(payload: Partial<SessionPayload>) {
  const cookie = cookies().get(COOKIES_KEYS.SESSION)?.value
  const session = (await decrypt(cookie)) as SessionPayload

  if (!cookie || !session) {
    return null
  }

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
