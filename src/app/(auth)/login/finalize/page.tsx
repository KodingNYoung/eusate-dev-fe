import FinalizeLogin from "@/components/views/login/FinalizeLogin"
import { getSession } from "@/lib/sessions"
import { TwoFAMethods } from "@/utils/enums"
import { PageFC } from "@/utils/types"
import React from "react"

const FinalizeLoginPage: PageFC = async ({ searchParams }) => {
  const { email } = (await getSession()) || {}
  return (
    <FinalizeLogin
      method={searchParams?.method as TwoFAMethods}
      email={email as string | undefined}
    />
  )
}

export default FinalizeLoginPage
