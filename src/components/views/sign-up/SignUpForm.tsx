"use client"

import { signup } from "@/app/(auth)/sign-up/actions"
import Input from "@/components/molecules/Inputs"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import { FC, FormState } from "@/utils/types"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { useFormState } from "react-dom"

const SignUpForm: FC = () => {
  const router = useRouter()
  const [state, action] = useFormState<FormState, FormData>(signup, {})

  useEffect(() => {
    if ("success" in state) {
      router.push(state.redirectTo || "")
    }
  }, [state, router])

  return (
    <form action={action} className="py-10 flex flex-col gap-3">
      <Input
        name="email"
        label="Work email"
        placeholder="Enter email address"
        isError={!!("error" in state && state.error?.fields?.email)}
        helperText={"error" in state ? state.error?.fields?.email : undefined}
      />
      <Input
        name="username"
        label="Fullname"
        placeholder="Enter full name"
        isError={!!("error" in state && state.error?.fields?.username)}
        helperText={
          "error" in state ? state.error?.fields?.username : undefined
        }
      />
      <div className="grid sm:grid-cols-2  gap-5">
        <Input
          name="organisation_name"
          label="Company name"
          placeholder="Enter  company name"
          isError={
            !!("error" in state && state.error?.fields?.organisation_name)
          }
          helperText={
            "error" in state
              ? state.error?.fields?.organisation_name
              : undefined
          }
        />
        <Input
          name="role"
          label="Job title (Optional)"
          placeholder="What is your role?"
        />
      </div>
      <SubmitButton className="mt-5">Proceed</SubmitButton>
    </form>
  )
}

export default SignUpForm
