"use client"

import { setup2fa } from "@/app/(auth)/setup-2fa/actions"
import HelperText from "@/components/atoms/HelperText"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import Radio from "@/components/molecules/Radio"
import { useFormToast, useValidation } from "@/hooks/formHooks"
import { TwoFAMethods } from "@/utils/enums"
import { FC, FormState } from "@/utils/types"
import { setup2faPayloadSchema } from "@/lib/schemas/auth"
import React, { ChangeEvent, useRef } from "react"
import { useFormState } from "react-dom"

const Setup2FAForm: FC = () => {
  const formRef = useRef<HTMLFormElement>(null)

  const { errors, touched, hasErrors, validate, markFieldTouched } =
    useValidation(setup2faPayloadSchema, formRef)
  const [state, action] = useFormState<FormState, FormData>(setup2fa, {})

  useFormToast(state)

  //   functions
  const onFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    markFieldTouched(name)
    validate(name)
  }

  return (
    <form action={action} className="py-10 flex flex-col gap-3" ref={formRef}>
      <div className="grid sm:grid-cols-2 gap-5">
        <Radio
          id={TwoFAMethods.AUTHENTICATOR}
          name="method"
          value={TwoFAMethods.AUTHENTICATOR}
          onChange={onFieldChange}
        >
          Authenticator app
        </Radio>
        <Radio
          id={TwoFAMethods.EMAIL}
          name="method"
          value={TwoFAMethods.EMAIL}
          onChange={onFieldChange}
        >
          OTP to Email
        </Radio>
      </div>
      {hasErrors && (
        <HelperText isError={hasErrors}>{errors.method}</HelperText>
      )}
      <SubmitButton className="mt-5" disabled={!touched.method || hasErrors}>
        Proceed
      </SubmitButton>
    </form>
  )
}

export default Setup2FAForm
