"use client"

import { setup2fa } from "@/app/(auth)/setup-2fa/actions"
import HelperText from "@/components/atoms/HelperText"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import { useFormToast, useValidation } from "@/hooks/formHooks"
import { TwoFAMethods } from "@/utils/enums"
import { FC, FormState, TWClassNames } from "@/utils/types"
import { setup2faPayloadSchema } from "@/lib/schemas/auth"
import React, { ChangeEvent, useRef } from "react"
import { useFormState } from "react-dom"
import MethodRadio from "./_components/MethodRadio"
import { cls } from "@/utils/helpers"

type Slots = "root" | "wrapper" | "button"
type Props = {
  use?: "page" | "dialog"
  dialogAction?: () => void
  classNames?: { [slot in Slots]?: TWClassNames }
  onMethodSelect?: (method: TwoFAMethods) => void
}

const Setup2FAForm: FC<Props> = ({
  use = "page",
  dialogAction,
  classNames,
  onMethodSelect,
}) => {
  const formRef = useRef<HTMLFormElement>(null)

  const { errors, hasErrors, markFieldTouched } = useValidation(
    setup2faPayloadSchema,
    formRef
  )
  const [state, action] = useFormState<FormState, FormData>(setup2fa, {})

  useFormToast(state)

  //   functions
  const onFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    markFieldTouched(e.target.name)
    if (onMethodSelect) onMethodSelect(e.target.value as TwoFAMethods)
  }

  return (
    <form
      action={use === "dialog" ? dialogAction : action}
      className={cls("py-10 flex flex-col gap-3", classNames?.root)}
      ref={formRef}
    >
      <div className={cls("grid gap-5", classNames?.wrapper)}>
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
      <SubmitButton
        className={cls("mt-5", classNames?.button)}
        disabled={hasErrors}
      >
        Proceed
      </SubmitButton>
    </form>
  )
}

export default Setup2FAForm
