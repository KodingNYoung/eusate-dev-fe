"use client"

import AuthHeader from "@/components/molecules/AuthHeader"
import QRCode from "@/components/views/setup-2fa/QRCode"
import { TwoFAMethods } from "@/utils/enums"
import { FC, FormState } from "@/utils/types"
import React, { ReactNode } from "react"
import ToastContextProvider from "@/providers/toastProviders"
import CodeInputForm from "./CodeInputForm"

type Props = {
  title: ReactNode
  subtitle: ReactNode
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
  qrcodeProps,
  submitAction,
  onError,
  onSuccess,
}) => {
  return (
    <ToastContextProvider>
      <main className="mx-auto w-[544px] px-4 py-8 max-w-full flex flex-col">
        <AuthHeader hasBackBtn toast title={title} subtitle={subtitle} />
        {isSetup && qrcodeProps && method === TwoFAMethods.AUTHENTICATOR && (
          <QRCode {...qrcodeProps} />
        )}
        <CodeInputForm
          submitAction={submitAction}
          onError={onError}
          onSuccess={onSuccess}
        />
      </main>
    </ToastContextProvider>
  )
}

export default TwoFACodeInputView
