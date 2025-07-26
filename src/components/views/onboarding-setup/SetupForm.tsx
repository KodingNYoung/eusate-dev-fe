"use client"

import { setupAccount } from "@/app/(auth)/onboarding-setup/actions"
import AppAutocomplete from "@/components/molecules/AppAutocomplete"
import AppSelect from "@/components/molecules/AppSelect"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import { useFormToast, useValidation } from "@/hooks/formHooks"
import { onboardingSetupPayloadSchema } from "@/lib/schemas/auth"
import { INDUSTRIES, ORGANISATION_SIZES, PRIMARY_USE_CASE } from "@/utils/dummy"
import { FC, FormState } from "@/utils/types"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef } from "react"
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
      <AppAutocomplete
        label="Primary use case for eusate"
        name="use_case"
        aira-label="select-use-case"
        placeholder="e.g. Customer support"
        size="lg"
        items={PRIMARY_USE_CASE}
        isInvalid={!!errors?.use_case}
        errorMessage={errors?.use_case}
        onInputChange={() => markFieldTouched("use_case")}
        inputProps={{
          classNames: {
            inputWrapper: "rounded-[100px] min-h-14",
            input: "text-[14px]",
          },
        }}
      />
      <SubmitButton className="mt-5" disabled={hasErrors}>
        Proceed
      </SubmitButton>
    </form>
  )
}

export default SetupForm
