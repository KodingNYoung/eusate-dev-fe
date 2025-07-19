"use client"

import { setupAccount } from "@/app/(auth)/onboarding-setup/actions"
import AppAutocomplete from "@/components/molecules/AppAutocomplete"
import AppSelect from "@/components/molecules/AppSelect"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import Input from "@/components/molecules/Inputs"
import { useFormToast, useValidation } from "@/hooks/formHooks"
import { onboardingSetupPayloadSchema } from "@/lib/schemas/auth"
import { INDUSTRIES, ORGANISATION_SIZES } from "@/utils/dummy"
import { FC, FormState } from "@/utils/types"
import { useRouter } from "next/navigation"
import React, { ChangeEvent, useEffect, useRef } from "react"
import { useFormState } from "react-dom"

const SetupForm: FC = () => {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const [state, action] = useFormState<FormState, FormData>(setupAccount, {})
  const { errors, hasErrors, markFieldTouched } = useValidation(
    onboardingSetupPayloadSchema,
    formRef
  )

  useFormToast(state, true)

  //   functions
  const onFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    markFieldTouched(e.target.name)
  }

  useEffect(() => {
    if ("success" in state) {
      router.push(state?.redirectTo || "")
    }
  }, [state, router])

  return (
    <form className="py-10 flex flex-col gap-3" action={action} ref={formRef}>
      <AppSelect
        label="Company size"
        name="company_size"
        placeholder="e.g. 10-15"
        size="lg"
        items={ORGANISATION_SIZES}
        isInvalid={!!errors?.company_size}
        errorMessage={errors?.company_size}
        classNames={{ trigger: "rounded-[100px]" }}
        onChange={(e) => markFieldTouched(e.target.name)}
      />
      <AppAutocomplete
        label="Industry sector"
        name="sector"
        aira-label="select-sector"
        placeholder="e.g. Technology"
        size="lg"
        items={INDUSTRIES}
        isInvalid={!!errors?.sector}
        errorMessage={errors?.sector}
        onInputChange={() => markFieldTouched("sector")}
        inputProps={{
          classNames: {
            inputWrapper: "rounded-[100px] min-h-14",
            input: "text-[14px]",
          },
        }}
      />
      <Input
        name="use_case"
        label="Primary use case for eusate"
        placeholder="e.g. Customer support"
        isError={!!errors?.use_case}
        helperText={errors?.use_case}
        onChange={onFieldChange}
      />
      <SubmitButton className="mt-5" disabled={hasErrors}>
        Proceed
      </SubmitButton>
    </form>
  )
}

export default SetupForm
