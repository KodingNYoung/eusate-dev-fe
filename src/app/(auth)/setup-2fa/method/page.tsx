import TwoFAMethod from "@/components/views/setup-2fa/TwoFAMethod"
import { getSession } from "@/lib/sessions"
import { TwoFAMethods } from "@/utils/enums"
import { PageFC } from "@/utils/types"
import React, { Suspense } from "react"
import { initiateTwoFA } from "../actions"

const Method2FAPage: PageFC = async ({ searchParams }) => {
  const method = searchParams?.method as TwoFAMethods
  const session = await getSession()
  const res = await initiateTwoFA(method)

  return (
    <Suspense fallback={<>Loading...</>}>
      <TwoFAMethod
        method={method}
        email={session?.email as string}
        qrcodeProps={
          "success" in res
            ? {
                svg: res.payload?.bar_code_svg || "",
                secretKey: res.payload?.secret_key || "",
              }
            : undefined
        }
      />
    </Suspense>
  )
}

export default Method2FAPage
