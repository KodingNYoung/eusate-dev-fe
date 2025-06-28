"use client"

import AuthHeader from "@/components/molecules/AuthHeader"
import QRCode from "@/components/views/setup-2fa/QRCode"
import { TwoFAMethods } from "@/utils/enums"
import { FC, FormState } from "@/utils/types"
import React, { ReactNode } from "react"
import CodeInputForm from "./CodeInputForm"

type Props = {
  title: ReactNode
  subtitle: ReactNode
  hasBackBtn?: boolean
  method: TwoFAMethods
  isSetup?: boolean
  submitAction: (state: FormState, formdata: FormData) => Promise<FormState>
  onSuccess?: (state: FormState) => void
  onError?: (state: FormState) => void
  qrcodeProps?: {
    svg: string
    secretKey: string
  }
}

const TwoFACodeInputView: FC<Props> = ({
  title,
  subtitle,
  method,
  isSetup,
  hasBackBtn,
  qrcodeProps,
  submitAction,
  onError,
  onSuccess,
}) => {
  return (
    <main className="mx-auto w-[544px] px-4 py-8 max-w-full flex flex-col">
      <AuthHeader hasBackBtn={hasBackBtn} title={title} subtitle={subtitle} />
      {isSetup && qrcodeProps && method === TwoFAMethods.AUTHENTICATOR && (
        <QRCode {...qrcodeProps} />
      )}
      <CodeInputForm
        submitAction={submitAction}
        onError={onError}
        onSuccess={onSuccess}
      />
    </main>
  )
}

export default TwoFACodeInputView
