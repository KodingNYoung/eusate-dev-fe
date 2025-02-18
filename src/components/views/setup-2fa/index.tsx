import { FC } from "@/utils/types"
import React from "react"
import Setup2FAForm from "./Setup2FAForm"
import AuthHeader from "@/components/molecules/AuthHeader"
import ToastContextProvider from "@/providers/toastProviders"

const Setup2FA: FC = () => {
  return (
    <ToastContextProvider>
      <main className="mx-auto w-full max-w-[544px] px-4 py-8 flex flex-col">
        <AuthHeader
          toast
          title="Set up 2FA"
          subtitle="Select a preferred 2FA method"
        />
        <Setup2FAForm />
      </main>
    </ToastContextProvider>
  )
}

export default Setup2FA
