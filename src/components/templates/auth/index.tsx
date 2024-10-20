import Icon from "@/components/atoms/Icon"
import Logo from "@/components/atoms/Logo"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import { FC } from "@/utils/types"
import React from "react"

const AuthLayout: FC = ({ children }) => {
  return (
    <main className="flex h-screen flex-col sm:flex-row">
      <div className="bg-auth-design bg-fixed bg-cover bg-no-repeat flex flex-col items-center justify-center gap-5 text-center sm:w-[40%] py-12 p-10">
        <Logo type="full-gradient-white" className="h-6 md:h-12 w-fit" />
        <Typography
          as="span"
          className="py-1.5 px-3 text-white-100 border border-white-15 bg-white-10 rounded-[100px] text-regular-xxs md:text-regular-xs sm:mt-5"
        >
          The number #1 customer support platform for startups
        </Typography>
      </div>
      <div className="relative sm:static h-full -mt-5 sm:mt-0 rounded-t-x20 sm:rounded-none bg-white-100 flex-1 flex flex-col sm:items-center sm:justify-center">
        {children}
        <Button
          variant="text"
          startContent={<Icon name="icon-eusate" />}
          size="mini"
          className="self-center"
        >
          Need help?
        </Button>
      </div>
    </main>
  )
}

export default AuthLayout
