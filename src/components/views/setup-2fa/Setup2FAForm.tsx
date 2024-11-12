"use client"

import { setup2fa } from "@/app/(auth)/setup-2fa/actions"
import HelperText from "@/components/atoms/HelperText"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import { useFormToast, useValidation } from "@/hooks/formHooks"
import { TwoFAMethods } from "@/utils/enums"
import { FC, FormState } from "@/utils/types"
import { setup2faPayloadSchema } from "@/lib/schemas/auth"
import React, { ChangeEvent, useRef } from "react"
import { useFormState } from "react-dom"
import MethodRadio from "./_components/MethodRadio"

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
      <div className="grid gap-5">
        <MethodRadio
          id={TwoFAMethods.AUTHENTICATOR}
          name="method"
          value={TwoFAMethods.AUTHENTICATOR}
          onChange={onFieldChange}
          title="Authenticator  app"
          description="Scan a QR code with your authenticator app (e.g., Google Authenticator) and enter the generated code for authentication."
        />
        <MethodRadio
          id={TwoFAMethods.EMAIL}
          name="method"
          value={TwoFAMethods.EMAIL}
          onChange={onFieldChange}
          title="OTP to Email"
          description="Receive a 2FA code via your company email and use it for verification in the next step."
        />
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
