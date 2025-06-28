import { TwoFAMethods } from "@/utils/enums"
import { FC } from "@/utils/types"
import React from "react"
import TwoFACodeInputView from "@/components/templates/TwoFACodeInputView"
import { sendCode } from "@/app/(auth)/setup-2fa/actions"

type Props = {
  method: TwoFAMethods
  email?: string
  hasBackBtn?: boolean
  qrcodeProps?: { svg: string; secretKey: string }
}

const TwoFAMethod: FC<Props> = ({
  method,
  email,
  qrcodeProps,
  hasBackBtn = true,
}) => {
  const methodSubtitles = {
    [TwoFAMethods.AUTHENTICATOR]:
      "Scan the QR code with your authenticator app (e.g., Google Authenticator) and enter the generated code below.",
    [TwoFAMethods.EMAIL]: (
      <span>
        Enter 6-digit 2FA code sent to you via work mail:{" "}
        <span className="text-gray-700">{email}</span>
      </span>
    ),
  }

  return (
    <TwoFACodeInputView
      title="Set up 2FA"
      hasBackBtn={hasBackBtn}
      subtitle={methodSubtitles[method]}
      method={method}
      submitAction={sendCode}
      isSetup
      qrcodeProps={qrcodeProps}
    />
  )
}

export default TwoFAMethod
