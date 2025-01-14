import { sendRequest } from "@/lib/request"
import { getSession, updateSession } from "@/lib/sessions"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const session = await getSession()
    if (!session?.refreshToken) {
      return NextResponse.json({ success: false }, { status: 401 })
    }

    const res = await sendRequest<{ access: string }>(
      "/api/v1/auth/token/refresh/",
      { refresh: session.refreshToken },
      { method: "POST" }
    )
    await updateSession({
      ...session,
      accessToken: res.access,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.log("couldn't refresh access token", err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
