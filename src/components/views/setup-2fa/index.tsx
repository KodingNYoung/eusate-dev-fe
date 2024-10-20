import { FC } from "@/utils/types"
import React from "react"
import Setup2FAForm from "./Setup2FAForm"
import AuthHeader from "@/components/molecules/AuthHeader"

type Props = { email: string }

const Setup2FA: FC<Props> = ({ email }) => {
  return (
    <main className="w-[544px] px-4 py-8 max-w-full flex flex-col">
      <AuthHeader
        title="Set up 2FA"
        subtitle="Select a preferred 2FA method"
        // hasBackBtn
      />
      <Setup2FAForm email={email} />
    </main>
  )
}

export default Setup2FA
