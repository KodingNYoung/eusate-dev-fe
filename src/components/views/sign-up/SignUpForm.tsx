"use client"

import { signup } from "@/app/(auth)/sign-up/actions"
import Input from "@/components/molecules/Inputs"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import { FC, FormState } from "@/utils/types"
import React, { ChangeEvent, FocusEvent, useRef } from "react"
import { useFormState } from "react-dom"
import { useFormToast, useValidation } from "@/hooks/formHooks"
import { signupPayloadSchema } from "@/lib/schemas/auth"

const SignUpForm: FC = () => {
  const formRef = useRef<HTMLFormElement>(null)

  const [state, action] = useFormState<FormState, FormData>(signup, {})
  const { errors, touched, hasErrors, validate, markFieldTouched } =
    useValidation(signupPayloadSchema, formRef)

  useFormToast(state)

  //   functions
  const onFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (touched[e.target.name]) validate(e.target.name)
  }
  const onBlur = (e: FocusEvent<HTMLInputElement>) =>
    markFieldTouched(e.target.name)

  return (
    <form ref={formRef} action={action} className="py-10 flex flex-col gap-3">
      <Input
        name="email"
        label="Work email"
        placeholder="Enter email address"
        isError={!!errors?.email}
        helperText={errors?.email}
        onChange={onFieldChange}
        onBlur={onBlur}
      />
      <Input
        name="username"
        label="Fullname"
        placeholder="Enter full name"
        isError={!!errors?.username}
        helperText={errors?.username}
        onChange={onFieldChange}
        onBlur={onBlur}
      />
      <div className="grid sm:grid-cols-2  gap-5">
        <Input
          name="organisation_name"
          label="Company name"
          placeholder="Enter  company name"
          isError={!!errors?.organisation_name}
          helperText={errors.organisation_name}
          onChange={onFieldChange}
          onBlur={onBlur}
        />
        <Input
          name="role"
          label="Job title (Optional)"
          placeholder="What is your role?"
        />
      </div>
      <SubmitButton
        className="mt-5"
        disabled={
          !touched.email ||
          !touched.username ||
          !touched.organisation_name ||
          hasErrors
        }
      >
        Proceed
      </SubmitButton>
    </form>
  )
}

export default SignUpForm
