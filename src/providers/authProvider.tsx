"use client"

import { logoutAction, refreshTokenAction } from "@/app/(auth)/actions"
import { FC, SessionPayload } from "@/utils/types"
import { createContext, useContext, useState } from "react"

type AuthContextType = {
  user?: Omit<
    SessionPayload,
    "accessToken" | "refreshToken" | "currentOrganisationId"
  >
  accessToken?: string
  isAuthenticated: boolean
  refreshAccessToken: () => Promise<boolean>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

type Props = {
  initialSession?: Omit<SessionPayload, "refreshToken">
}
export const AuthProvider: FC<Props> = ({ children, initialSession }) => {
  const [accessToken, setAccessToken] = useState<string | undefined>(
    initialSession?.accessToken
  )
  const [user, setUser] = useState<
    | Omit<
        SessionPayload,
        "accessToken" | "refreshToken" | "currentOrganisationId"
      >
    | undefined
  >(initialSession)

  const refreshAccessToken = async () => {
    try {
      const response = await refreshTokenAction()
      if (response.success) {
        setAccessToken(response.accessToken)
      } else {
        setAccessToken(undefined)
        setUser(undefined)
      }
      return response.success
    } catch {
      setAccessToken(undefined)
      setUser(undefined)
      return false
    }
  }

  const logout = async () => {
    setAccessToken(undefined)
    setUser(undefined)
    await logoutAction()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!accessToken,
        refreshAccessToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
