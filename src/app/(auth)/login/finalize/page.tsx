import FinalizeLogin from "@/components/views/login/FinalizeLogin"
import { TwoFAMethods } from "@/utils/enums"
import { PageFC } from "@/utils/types"
import React from "react"

const FinalizeLoginPage: PageFC = ({ searchParams }) => {
  console.log(searchParams)
  return (
    <FinalizeLogin
      method={searchParams?.method as TwoFAMethods}
      email={searchParams?.email as string | undefined}
    />
  )
}

export default FinalizeLoginPage
