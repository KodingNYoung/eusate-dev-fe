import { finalizeLogin } from "@/app/(auth)/login/actions"
import TwoFACodeInputView from "@/components/templates/TwoFACodeInputView"
import { TwoFAMethods } from "@/utils/enums"
import { FC } from "@/utils/types"
import React from "react"

type Props = {
  method: TwoFAMethods
  email?: string
}

const FinalizeLogin: FC<Props> = ({ email, method }) => {
  const methodSubtitles = {
    [TwoFAMethods.AUTHENTICATOR]:
      "Enter  6-digit 2FA code from your authenticator app.",
    [TwoFAMethods.EMAIL]: (
      <span>
        Enter 6-digit 2FA code sent to you via work mail:{" "}
        <span className="text-gray-700">{email}</span>
      </span>
    ),
  }

  return (
    <TwoFACodeInputView
      title="Verify with 2FA code"
      subtitle={methodSubtitles[method]}
      method={method}
      submitAction={finalizeLogin}
    />
  )
}

export default FinalizeLogin
