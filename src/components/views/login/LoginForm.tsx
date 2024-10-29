"use client"

import { initiateLogin } from "@/app/(auth)/login/actions"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import Input from "@/components/molecules/Inputs"
import { useFormToast, useValidation } from "@/hooks/formHooks"
import { initiateLoginPayloadSchema } from "@/lib/schemas/auth"
import { FormState } from "@/utils/types"
import React, { useRef } from "react"
import { useFormState } from "react-dom"

const LoginForm = () => {
  const formRef = useRef<HTMLFormElement>(null)

  const { errors, touched, hasErrors, validate, markFieldTouched } =
    useValidation(initiateLoginPayloadSchema, formRef)
  const [state, action] = useFormState<FormState, FormData>(initiateLogin, {})

  useFormToast(state)

  return (
    <form className="py-10 flex flex-col gap-3" action={action} ref={formRef}>
      <Input
        name="email"
        label="Work email"
        placeholder="Enter email address"
        isError={!!errors?.email}
        helperText={errors?.email}
        onChange={(e) => {
          validate(e.currentTarget.name)
        }}
        onBlur={(e) => markFieldTouched(e.currentTarget.name)}
      />
      <SubmitButton className="mt-5" disabled={hasErrors || !touched.email}>
        Proceed
      </SubmitButton>
    </form>
  )
}

export default LoginForm
