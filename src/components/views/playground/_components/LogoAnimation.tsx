import { FC } from "@/utils/types"
import Image from "next/image"
import React from "react"
import logo from "@/assets/images/playground-icon.svg"

const LogoAnimation: FC = () => {
  return (
    <Image
      src={logo}
      height={160}
      width={160}
      alt="logo"
      className="w-28 sm:w-40 h-28 sm:h-40"
    />
  )
}

export default LogoAnimation
