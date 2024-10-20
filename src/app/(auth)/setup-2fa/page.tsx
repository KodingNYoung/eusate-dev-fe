import Setup2FA from "@/components/views/setup-2fa"
import { PageFC } from "@/utils/types"
import React from "react"

const Setup2FAPage: PageFC = ({ searchParams }) => {
  return <Setup2FA email={searchParams?.email as string} />
}

export default Setup2FAPage
