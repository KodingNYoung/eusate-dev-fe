"use client"

import { setup2fa } from "@/app/(auth)/setup-2fa/actions"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import Radio from "@/components/molecules/Radio"
import { TwoFAMethods } from "@/utils/enums"
import { FC, FormState } from "@/utils/types"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { useFormState } from "react-dom"

type Props = {
  email: string
}

const Setup2FAForm: FC<Props> = ({ email }) => {
  const router = useRouter()
  const [state, action] = useFormState<FormState, FormData>(setup2fa, {})

  useEffect(() => {
    if ("success" in state) {
      router.push(state.redirectTo || "")
    }
  }, [state, router])

  return (
    <form action={action} className="py-10 flex flex-col gap-3">
      <input hidden value={email} readOnly name="email" />
      <div className="grid sm:grid-cols-2 gap-5">
        <Radio
          id={TwoFAMethods.AUTHENTICATOR}
          name="method"
          value={TwoFAMethods.AUTHENTICATOR}
        >
          Authenticator app
        </Radio>
        <Radio id={TwoFAMethods.EMAIL} name="method" value={TwoFAMethods.EMAIL}>
          OTP to Email
        </Radio>
      </div>
      <SubmitButton className="mt-5">Proceed</SubmitButton>
    </form>
  )
}

export default Setup2FAForm
