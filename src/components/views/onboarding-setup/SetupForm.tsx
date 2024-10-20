"use client"

import { setupAccount } from "@/app/(auth)/onboarding-setup/actions"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import Input from "@/components/molecules/Inputs"
import { FC, FormState } from "@/utils/types"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { useFormState } from "react-dom"

const SetupForm: FC = () => {
  const router = useRouter()
  const [state, action] = useFormState<FormState, FormData>(setupAccount, {})

  useEffect(() => {
    if ("success" in state) {
      router.push(state.redirectTo || "")
    }
  }, [state, router])

  console.log(state)

  return (
    <form className="py-10 flex flex-col gap-3" action={action}>
      <Input
        name="company_size"
        label="Company size"
        placeholder="e.g. 10-15"
        isError={!!("error" in state && state.error?.fields?.company_size)}
        helperText={
          "error" in state ? state.error?.fields?.company_size : undefined
        }
      />
      <Input
        name="sector"
        label="Industry sector"
        placeholder="e.g. Technology"
        isError={!!("error" in state && state.error?.fields?.sector)}
        helperText={"error" in state ? state.error?.fields?.sector : undefined}
      />
      <Input
        name="use_case"
        label="Primary use case for eusate"
        placeholder="e.g. Customer support"
        isError={!!("error" in state && state.error?.fields?.use_case)}
        helperText={
          "error" in state ? state.error?.fields?.use_case : undefined
        }
      />
      <SubmitButton className="mt-5">Proceed</SubmitButton>
    </form>
  )
}

export default SetupForm
