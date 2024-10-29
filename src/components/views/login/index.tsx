import AuthHeader from "@/components/molecules/AuthHeader"
import Button from "@/components/molecules/Buttons"
import { ROUTES } from "@/utils/constants"
import { FC } from "@/utils/types"
import Link from "next/link"
import React from "react"
import LoginForm from "./LoginForm"
import ToastContextProvider from "@/providers/toastProviders"

const Login: FC = () => {
  return (
    <ToastContextProvider>
      <main className="mx-auto w-[544px] px-4 py-8 max-w-full flex flex-col ">
        <AuthHeader
          title="Welcome back 👋"
          toast
          subtitle={
            <>
              Don&apos;t have an account?
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
    </ToastContextProvider>
  )
}

export default Login
