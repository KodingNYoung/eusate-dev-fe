"use client"

import { getClientSession } from "@/app/actions"
import { SessionPayload } from "@/utils/types"
import { useEffect, useState } from "react"

export const useSession = () => {
  const [session, setSession] = useState<SessionPayload | null>(null)

  useEffect(() => {
    ;(async () => {
      const session = await getClientSession()
      setSession(session)
    })()
  }, [])

  return session
}
