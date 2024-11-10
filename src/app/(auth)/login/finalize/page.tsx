import FinalizeLogin from "@/components/views/login/FinalizeLogin"
import { getSession } from "@/lib/sessions"
import { TwoFAMethods } from "@/utils/enums"
import { PageFC } from "@/utils/types"
import React, { Suspense } from "react"

const FinalizeLoginPage: PageFC = async ({ searchParams }) => {
  const { email } = (await getSession()) || {}
  return (
    <Suspense fallback={<>loading...</>}>
      <FinalizeLogin
        method={searchParams?.method as TwoFAMethods}
        email={email as string | undefined}
      />
    </Suspense>
  )
}

export default FinalizeLoginPage
