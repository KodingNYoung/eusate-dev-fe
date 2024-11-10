import SignUp from "@/components/views/sign-up"
import { PageFC } from "@/utils/types"
import React, { Suspense } from "react"

const SignUpPage: PageFC = () => {
  return (
    <Suspense fallback={<div>loading in suspense...</div>}>
      <SignUp />
    </Suspense>
  )
}

export default SignUpPage
