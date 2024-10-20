"use client"

import AuthHeader from "@/components/molecules/AuthHeader"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import OtpInput from "@/components/molecules/Inputs/OtpInput"
import QRCode from "@/components/views/setup-2fa/QRCode"
import { TwoFAMethods } from "@/utils/enums"
import { FC, FormState } from "@/utils/types"
import { useRouter } from "next/navigation"
import React, { ReactNode, useEffect, useState } from "react"
import { useFormState } from "react-dom"

type Props = {
  title: ReactNode
  subtitle: ReactNode
  method: TwoFAMethods
  isSetup?: boolean
  submitHandler: (state: FormState, formdata: FormData) => Promise<FormState>
  onSuccess?: () => void
  onError?: () => void
}

const TwoFACodeInputView: FC<Props> = ({
  title,
  subtitle,
  method,
  isSetup,
  submitHandler,
  onSuccess,
  onError,
}) => {
  const router = useRouter()
  const [otp, setOtp] = useState("")

  const [state, action] = useFormState<FormState, FormData>(submitHandler, {})

  useEffect(() => {
    if ("success" in state) {
      router.push(state.redirectTo || "")
      if (onSuccess) onSuccess()
    } else {
      if (onError) onError()
    }
  }, [state, onError, onSuccess, router])

  return (
    <main className="w-[544px] px-4 py-8 max-w-full flex flex-col">
      <AuthHeader hasBackBtn title={title} subtitle={subtitle} />
      {isSetup && method === TwoFAMethods.AUTHENTICATOR && <QRCode />}
      <form className="py-10 flex flex-col gap-10" action={action}>
        <input name="code" value={otp} readOnly hidden />
        <OtpInput
          label="Enter 2FA code"
          onChange={setOtp}
          isError={!!("error" in state && state.error?.fields?.code)}
          helperText={"error" in state ? state.error?.fields?.code : undefined}
        />
        <SubmitButton size="xl">Verify 2FA code</SubmitButton>
      </form>
    </main>
  )
}

export default TwoFACodeInputView
