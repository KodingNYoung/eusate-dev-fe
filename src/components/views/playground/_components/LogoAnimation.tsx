import { FC } from "@/utils/types"
import Image from "next/image"
import React from "react"
import logo from "@/assets/images/playground-icon.svg"

const LogoAnimation: FC = () => {
  return (
    <Image
      src={logo}
      height={100}
      width={100}
      alt="logo"
      className="w-16 sm:w-24 h-16 sm:h-24"
    />
  )
}

export default LogoAnimation
