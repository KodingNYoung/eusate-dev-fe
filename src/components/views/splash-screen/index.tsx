import Icon from "@/components/atoms/Icon"
import Logo from "@/components/atoms/Logo"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import { ROUTES } from "@/utils/constants"
import { FC } from "@/utils/types"
import Link from "next/link"
import React from "react"
import "./style.css"

const SplashScreen: FC = () => {
  return (
    <main className="h-screen">
      <div className="bg-auth-design bg-fixed bg-cover bg-no-repeat h-full bg-left-top flex flex-col items-center justify-center gap-5 text-center">
        <Logo type="full-gradient-white" className="h-6 w-fit" />
        <Typography
          as="span"
          className="py-1.5 px-3 text-white-100 border border-white-15 bg-white-10 rounded-[100px] text-regular-xxs sm:text-regular-xs sm:mt-5"
        >
          The number #1 customer support platform for startups
        </Typography>
        <Typography
          as="h1"
          className="text-white-100 text-bold-2xl sm:text-bold-5xl md:text-bold-6xl mt-5 mb-5 sm:mt-0"
        >
          Welcome to Eusate!
        </Typography>
        <div className="flex gap-3 justify-center items-center">
          <Link href={ROUTES.LOGIN}>
            <Button
              size="xl"
              variant="tetiaryText"
              className="px-3 py-1 sm:py-4.5 sm:w-40"
            >
              Login
            </Button>
          </Link>
          <Link href={ROUTES.SIGN_UP}>
            <Button
              size="xl"
              endContent={<Icon name="icon-arrow-right" />}
              className="primary-gradient-btn px-3 py-1 sm:py-4.5 sm:w-40"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default SplashScreen
