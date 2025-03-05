import { FC } from "@/utils/types"
import React from "react"
import Setup2FAForm from "./Setup2FAForm"
import AuthHeader from "@/components/molecules/AuthHeader"

const Setup2FA: FC = () => {
  return (
    <main className="mx-auto w-full max-w-[544px] px-4 py-8 flex flex-col">
      <AuthHeader title="Set up 2FA" subtitle="Select a preferred 2FA method" />
      <Setup2FAForm />
    </main>
  )
}

export default Setup2FA
