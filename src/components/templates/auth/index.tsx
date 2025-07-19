import Icon from "@/components/atoms/Icon"
import Logo from "@/components/atoms/Logo"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import { FC } from "@/utils/types"
import Image from "next/image"
import React from "react"
import authImage from "@/assets/images/auth-pages-image.svg"

const AuthLayout: FC = ({ children }) => {
  return (
    <main className="flex h-screen flex-col md:flex-row">
      <div className="bg-auth-design bg-fixed bg-cover bg-no-repeat md:w-[40%] md:min-w-[320px]">
        <div className="py-12 p-10 flex flex-col items-center justify-center md:items-start">
          <Logo type="full-gradient-white" className="h-6 w-fit" />
          <Typography
            as="p"
            className="py-1.5 px-3 text-white-100 border border-white-15 bg-white-10 rounded-[100px] text-regular-xxs md:text-regular-xs mt-4 md:mt-20 md:mb-4 w-fit"
          >
            The number #1 customer support platform for startups
          </Typography>
          <Typography className="text-white text-bold-3xl mb-12 hidden md:block">
            Resolve Customer Queries
            <span className="text-gradient"> 10x Faster </span>
            Without Scaling Your Headcount
          </Typography>
        </div>
        <div className="pl-10 hidden md:block">
          <Image
            src={authImage}
            alt="Auth Page Illustration"
            height={650}
            width={960}
            className="max-w-full"
          />
        </div>
      </div>
      <div className="relative md:static h-full -mt-5 md:mt-0 rounded-t-x20 md:rounded-none bg-white-100 flex-1 flex flex-col md:items-center md:justify-center">
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
