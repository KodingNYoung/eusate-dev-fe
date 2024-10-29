import Login from "@/components/views/login"
import { PageFC } from "@/utils/types"
import React, { Suspense } from "react"

const LoginPage: PageFC = () => {
  return (
    <Suspense fallback={<Login />}>
      <Login />
    </Suspense>
  )
}

export default LoginPage
