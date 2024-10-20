import TwoFAMethod from "@/components/views/setup-2fa/TwoFAMethod"
import { TwoFAMethods } from "@/utils/enums"
import { PageFC } from "@/utils/types"
import React from "react"

const Method2FAPage: PageFC = ({ params, searchParams }) => {
  return (
    <TwoFAMethod
      method={params?.method as TwoFAMethods}
      email={searchParams?.email as string}
    />
  )
}

export default Method2FAPage
