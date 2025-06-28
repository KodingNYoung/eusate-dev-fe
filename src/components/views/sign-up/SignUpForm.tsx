"use client"

import { signup } from "@/app/(auth)/sign-up/actions"
import Input from "@/components/molecules/Inputs"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import { FC, FormState } from "@/utils/types"
import React, { ChangeEvent, useRef } from "react"
import { useFormState } from "react-dom"
import { useFormToast, useValidation } from "@/hooks/formHooks"
import { signupPayloadSchema } from "@/lib/schemas/auth"

const SignUpForm: FC = () => {
  const formRef = useRef<HTMLFormElement>(null)

  const [state, action] = useFormState<FormState, FormData>(signup, {})
  const { errors, hasErrors, markFieldTouched } = useValidation(
    signupPayloadSchema,
    formRef
  )

  useFormToast(state)

  //   functions
  const onFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    markFieldTouched(e.target.name)
  }

  return (
    <form ref={formRef} action={action} className="py-10 flex flex-col gap-3">
      <Input
        name="email"
        label="Work email"
        placeholder="Enter email address"
        isError={!!errors?.email}
        helperText={errors?.email}
        onChange={onFieldChange}
      />
      <Input
        name="username"
        label="Fullname"
        placeholder="Enter full name"
        isError={!!errors?.username}
        helperText={errors?.username}
        onChange={onFieldChange}
      />
      <Input
        name="organisation_name"
        label="Company name"
        placeholder="Enter  company name"
        isError={!!errors?.organisation_name}
        helperText={errors.organisation_name}
        onChange={onFieldChange}
      />
      <SubmitButton className="mt-5" disabled={hasErrors}>
        Proceed
      </SubmitButton>
    </form>
  )
}

export default SignUpForm
