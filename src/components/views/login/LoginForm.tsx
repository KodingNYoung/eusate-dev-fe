"use client"

import { initiateLogin } from "@/app/(auth)/login/actions"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import Input from "@/components/molecules/Inputs"
import { FormState } from "@/utils/types"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { useFormState } from "react-dom"

const LoginForm = () => {
  const router = useRouter()
  const [state, action] = useFormState<FormState, FormData>(initiateLogin, {})

  useEffect(() => {
    if ("success" in state) {
      router.push(state.redirectTo || "")
    }
  }, [state, router])

  return (
    <form className="py-10 flex flex-col gap-3" action={action}>
      <Input
        name="email"
        label="Work email"
        placeholder="Enter email address"
        isError={!!("error" in state && state.error?.fields?.email)}
        helperText={"error" in state ? state.error?.fields?.email : undefined}
      />
      <SubmitButton className="mt-5">Proceed</SubmitButton>
    </form>
  )
}

export default LoginForm
