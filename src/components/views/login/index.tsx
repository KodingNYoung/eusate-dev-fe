import AuthHeader from "@/components/molecules/AuthHeader"
import Button from "@/components/molecules/Buttons"
import { ROUTES } from "@/utils/constants"
import { FC } from "@/utils/types"
import Link from "next/link"
import React from "react"
import LoginForm from "./LoginForm"

const Login: FC = () => {
  return (
    <main className="w-[544px] px-4 py-8 max-w-full flex flex-col">
      <AuthHeader
        title="Welcome back 👋"
        subtitle={
          <>
            Don’t have an account?
            <Link href={ROUTES.SIGN_UP}>
              <Button variant="tetiary" size="mini" className="px-3">
                Create an account
              </Button>
            </Link>
          </>
        }
      />
      <LoginForm />
    </main>
  )
}

export default Login
