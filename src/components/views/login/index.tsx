import AuthHeader from "@/components/molecules/AuthHeader"
import Button from "@/components/molecules/Buttons"
import { ROUTES } from "@/utils/constants"
import { FC } from "@/utils/types"
import Link from "next/link"
import React from "react"
import LoginForm from "./LoginForm"

const Login: FC = () => {
  return (
    <main className="mx-auto w-full max-w-[544px] px-4 py-8 flex flex-col ">
      <AuthHeader
        title="Welcome back 👋"
        subtitle={
          <>
            Don&apos;t have an account?
            <Link href={ROUTES.SIGN_UP} prefetch>
              <Button variant="tetiary" size="mini" className="px-3 py-1.5">
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
