"use client"

import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import { useAuth } from "@/providers/authProvider"
import React from "react"

const LogoutButton = () => {
  const { logout } = useAuth()

  return (
    <form action={logout}>
      <SubmitButton variant="errorOutlined" className="w-full !py-3">
        Log out
      </SubmitButton>
    </form>
  )
}

export default LogoutButton
