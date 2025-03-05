import Button from "@/components/molecules/Buttons"
import { ROUTES } from "@/utils/constants"
import { FC } from "@/utils/types"
import Link from "next/link"
import React from "react"
import SignUpForm from "./SignUpForm"
import AuthHeader from "@/components/molecules/AuthHeader"

const SignUp: FC = () => {
  return (
    <main className="mx-auto w-full max-w-[544px] px-4 py-8 flex flex-col">
      <AuthHeader
        title="Create an Account"
        subtitle={
          <>
            Already have an account?{" "}
            <Link href={ROUTES.LOGIN}>
              <Button variant="tetiary" size="mini" className="px-3 py-1.5">
                Login
              </Button>
            </Link>
          </>
        }
      />
      <SignUpForm />
    </main>
  )
}

export default SignUp
