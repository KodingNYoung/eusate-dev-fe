"use server"

import { deleteSession, getSession, refreshAccessToken } from "@/lib/sessions"
import { ROUTES } from "@/utils/constants"
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
