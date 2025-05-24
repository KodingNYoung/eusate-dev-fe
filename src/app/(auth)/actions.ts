"use server"

import { deleteSession, getSession, refreshAccessToken } from "@/lib/sessions"
import { redirect } from "next/navigation"

export const refreshTokenAction = async () => {
  return await refreshAccessToken()
}

export async function logoutAction() {
  await deleteSession()
  redirect("/login")
}

export async function getAccessTokenAction() {
  const session = await getSession()
  return session?.accessToken || null
}
