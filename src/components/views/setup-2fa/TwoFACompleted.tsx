"use client"

import Button from "@/components/molecules/Buttons"
import { ROUTES } from "@/utils/constants"
import { FC } from "@/utils/types"
import { useRouter } from "next/navigation"
import check from "@/assets/images/completed-check.svg"
import React from "react"
import Image from "next/image"
import Typography from "@/components/atoms/Typography"

const TwoFACompleted: FC = () => {
  const router = useRouter()
  return (
    <main className="mx-auto w-full max-w-[544px] px-4 py-8 flex flex-col items-center gap-10">
      <Image src={check} height={120} width={120} alt="completed checl icon" />
      <header className="text-center">
        <Typography as="h2" className="text-bold-2xl sm:text-bold-4xl mb-3">
          2FA setup completed!
        </Typography>
        <Typography as="span" variant="regular-sm" className="text-gray-500">
          You have successfully registered a 2FA method for authentication.
        </Typography>
      </header>
      <Button
        className="w-full py-4.5"
        onClick={() => router.push(ROUTES.LOGIN)}
      >
        Proceed to Login
      </Button>
    </main>
  )
}

export default TwoFACompleted
