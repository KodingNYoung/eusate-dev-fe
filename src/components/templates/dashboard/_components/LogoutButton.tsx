import { logoutAction } from "@/app/(auth)/actions"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import React from "react"
import { useFormState } from "react-dom"

const LogoutButton = () => {
  const state = useFormState(logoutAction, undefined)

  return (
    <form action={state[1]}>
      <SubmitButton variant="errorOutlined" className="w-full !py-3">
        Log out
      </SubmitButton>
    </form>
  )
}

export default LogoutButton
