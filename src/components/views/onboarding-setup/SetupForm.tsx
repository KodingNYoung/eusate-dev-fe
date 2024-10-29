"use client"

import { setupAccount } from "@/app/(auth)/onboarding-setup/actions"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import Input from "@/components/molecules/Inputs"
import { useFormToast, useValidation } from "@/hooks/formHooks"
import { onboardingSetupPayloadSchema } from "@/lib/schemas/auth"
import { FC, FormState } from "@/utils/types"
import { useRouter } from "next/navigation"
import React, { ChangeEvent, FocusEvent, useEffect, useRef } from "react"
import { useFormState } from "react-dom"

const SetupForm: FC = () => {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const [state, action] = useFormState<FormState, FormData>(setupAccount, {})
  const { errors, touched, hasErrors, validate, markFieldTouched } =
    useValidation(onboardingSetupPayloadSchema, formRef)

  useFormToast(state, true)

  //   functions
  const onFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (touched[e.target.name]) validate(e.target.name)
  }
  const onBlur = (e: FocusEvent<HTMLInputElement>) =>
    markFieldTouched(e.target.name)

  useEffect(() => {
    if ("success" in state) {
      setTimeout(() => {
        router.push(state?.redirectTo || "")
      }, 1000)
    }
  }, [state, router])

  return (
    <form className="py-10 flex flex-col gap-3" action={action} ref={formRef}>
      <Input
        name="company_size"
        label="Company size"
        placeholder="e.g. 10-15"
        isError={!!errors?.company_size}
        helperText={errors?.company_size}
        onChange={onFieldChange}
        onBlur={onBlur}
      />
      <Input
        name="sector"
        label="Industry sector"
        placeholder="e.g. Technology"
        isError={!!errors?.sector}
        helperText={errors?.sector}
        onChange={onFieldChange}
        onBlur={onBlur}
      />
      <Input
        name="use_case"
        label="Primary use case for eusate"
        placeholder="e.g. Customer support"
        isError={!!errors?.use_case}
        helperText={errors?.use_case}
        onChange={onFieldChange}
        onBlur={onBlur}
      />
      <SubmitButton
        className="mt-5"
        disabled={
          !touched.company_size ||
          !touched.sector ||
          !touched.use_case ||
          hasErrors
        }
      >
        Proceed
      </SubmitButton>
    </form>
  )
}

export default SetupForm
