import { FC, LogoVariants } from "@/utils/types"
import { StaticImport } from "next/dist/shared/lib/get-img-props"
import React from "react"
import fullBlack from "@/assets/logos/full-black.svg"
import fullGray from "@/assets/logos/full-gray.svg"
import fullWhite from "@/assets/logos/full-white.svg"
import fullGradientWhite from "@/assets/logos/full-gradient-white.svg"
import fullGradientBlack from "@/assets/logos/full-gradient-black.svg"
import iconWhite from "@/assets/logos/icon-white.svg"
import iconBlack from "@/assets/logos/icon-black.svg"
import iconGradient from "@/assets/logos/icon-gradient.svg"
import Image from "next/image"

type Props = {
  type: LogoVariants
}

const typeProps: { [key in LogoVariants]: StaticImport } = {
  "full-black": fullBlack,
  "full-gray": fullGray,
  "full-white": fullWhite,
  "full-gradient-black": fullGradientBlack,
  "full-gradient-white": fullGradientWhite,
  "icon-white": iconWhite,
  "icon-black": iconBlack,
  "icon-gradient": iconGradient,
}

const Logo: FC<Props> = ({ type, className }) => {
  return (
    <Image
      src={typeProps[type]}
      alt={`logo-${type}`}
      className={className}
      priority
      height={111}
    />
  )
}

export default Logo
